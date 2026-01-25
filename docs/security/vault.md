# Vault Secrets Management

OmniGCloud uses HashiCorp Vault for managing sensitive secrets in deploy environments (Dev, SIT, UAT, Prod).

## Strategy

The `src/secrets` module abstracts the source of secrets:

- **Local (`APP_ENV=local`)**: Secrets are read directly from `process.env` (.env file).
- **Non-Local (`dev`, `prod`, etc.)**: Secrets are fetched from Vault and cached in memory for 60 seconds.

## Vault Configuration

In non-local environments, the container must have the following variables set to authenticate with Vault:

- `VAULT_ADDR`: The URL of the Vault server.
- `VAULT_TOKEN`: A valid Vault token (or use AppRole logic if extended).

## Secret Structure (KV v2)

We use the KV v2 secrets engine mounted at `secret/`.

### Paths per Environment

| Environment | Vault Path                        |
| ----------- | --------------------------------- |
| **dev**     | `secret/data/nascent-zodiac/dev`  |
| **sit**     | `secret/data/nascent-zodiac/sit`  |
| **uat**     | `secret/data/nascent-zodiac/uat`  |
| **prod**    | `secret/data/nascent-zodiac/prod` |

### Key Names

Keys inside Vault should match the environment variable names they replace.

Example:

```json
{
  "AUTH_SECRET": "prod-secret-value-xyz",
  "OCI_PRIVATE_KEY": "-----BEGIN PRIVATE KEY-----..."
}
```

## Migration

To migrate a new secret:

1. Add it to `.env` for local dev.
2. Add it to the Vault path for `dev/prod` etc.
3. Update `src/config/index.ts` or consuming code to use `await getSecret('KEY')`.

---

# Cloud Deployment & Integration

For actual deployment to OpenShift, Kubernetes, or OCI VMs, we recommend the following patterns to inject the `VAULT_TOKEN` or environment variables safely.

## 1. Kubernetes / OpenShift (External Secrets Operator)

We recommend using [External Secrets Operator (ESO)](https://external-secrets.io/) to sync Vault secrets into Kubernetes `Secret` resources, which are then injected as environment variables.

**Why?**

- Native K8s integration.
- Automatic rotation.
- Keeps the application code simple (it just reads ENV vars or uses the `src/secrets` fetcher if preferred).

### Example: `ExternalSecret` Mapping

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: nascent-zodiac-secrets
  namespace: omnig-prod
spec:
  refreshInterval: "1m"
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: app-env-secret # The K8s secret to be created
    creationPolicy: Owner
  data:
    # Maps Vault Key -> K8s Secret Key
    - secretKey: AUTH_SECRET
      remoteRef:
        key: secret/data/nascent-zodiac/prod
        property: AUTH_SECRET
    - secretKey: REDIS_URL
      remoteRef:
        key: secret/data/nascent-zodiac/prod
        property: REDIS_URL
```

### Usage in `Deployment`

```yaml
envFrom:
  - secretRef:
      name: app-env-secret
```

## 2. Docker / OCI VM (Vault Agent)

For raw Docker or VM deployments, use **Vault Agent** as a sidecar or init-container to render the secrets to a `.env` file or provide the token.

### Vault Agent Template Example

Create a template file `app.env.ctmpl`:

```hcl
{{ with secret "secret/data/nascent-zodiac/prod" }}
APP_ENV=prod
AUTH_SECRET="{{ .Data.data.AUTH_SECRET }}"
REDIS_URL="{{ .Data.data.REDIS_URL }}"
{{ end }}
```

### Vault Agent Config (`agent-config.hcl`)

```hcl
auto_auth {
  method "approle" {
    mount_path = "auth/approle"
    config = {
      role_id_file_path = "/etc/vault/role-id"
      secret_id_file_path = "/etc/vault/secret-id"
    }
  }
}

template {
  source      = "/etc/vault/app.env.ctmpl"
  destination = "/app/.env.prod"
}
```

### Running the App

The application can then rely on the `src/secrets` module's Vault fetching logic (if `VAULT_TOKEN` is present) OR simply load the rendered `.env` file using dotenv if preferred.

For the **Hybrid approach** used in `src/secrets`:

1. Vault Agent performs Auto-Auth (AppRole/AWS/K8s).
2. Vault Agent writes the sink token to `~/.vault-token`.
3. Application starts, reads `VAULT_TOKEN` from file or env, and fetches secrets dynamically.
