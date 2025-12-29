import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Shield, Key, Link as LinkIcon, Lock } from "lucide-react";

export default async function SecuritySettingsPage() {
    const session = await auth();
    const t = await getTranslations("SecuritySettings");

    if (!session) {
        redirect("/api/auth/signin");
    }

    const maskId = (id: string | undefined) => {
        if (!id || id === "your_google_client_id" || id === "your_entra_id_client_id") return "• • • • • • • •";
        return id.substring(0, 6) + " • • • • " + id.substring(id.length - 4);
    };

    const providers = [
        {
            name: "Google Workspace",
            id: "google",
            clientId: process.env.AUTH_GOOGLE_ID,
            enabled: !!process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_ID !== "your_google_client_id",
        },
        {
            name: "Microsoft Entra ID",
            id: "microsoft-entra-id",
            clientId: process.env.AUTH_ENTRA_ID,
            tenantId: process.env.AUTH_ENTRA_TENANT_ID,
            enabled: !!process.env.AUTH_ENTRA_ID && process.env.AUTH_ENTRA_ID !== "your_entra_id_client_id",
        },
        {
            name: "Email Magic Link",
            id: "email",
            enabled: process.env.ENABLE_MAGIC_LINK === "true",
            sender: process.env.EMAIL_FROM
        },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">{t("title")}</h1>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400">
                {t("description")}
            </p>

            <section className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <Key className="w-5 h-5" />
                    <h2>{t("ssoConfiguration")}</h2>
                </div>

                <div className="grid gap-4">
                    {providers.map((p) => (
                        <div key={p.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{p.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                                    {p.enabled ? t("enabled") : t("disabled")}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-zinc-500">{t("clientId")}</p>
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded block mt-1 overflow-hidden text-ellipsis">
                                        {maskId(p.clientId)}
                                    </code>
                                </div>
                                {"tenantId" in p && (
                                    <div>
                                        <p className="text-zinc-500">{t("tenantId")}</p>
                                        <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded block mt-1 overflow-hidden text-ellipsis">
                                            {maskId(p.tenantId)}
                                        </code>
                                    </div>
                                )}
                                {"sender" in p && (
                                    <div>
                                        <p className="text-zinc-500">{t("outboundEmail")}</p>
                                        <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded block mt-1 overflow-hidden text-ellipsis">
                                            {p.sender}
                                        </code>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                <p className="text-zinc-500 text-xs flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    {t("callbackUrl")}
                                </p>
                                <code className="text-xs text-blue-500 break-all select-all">
                                    /api/auth/callback/{p.id}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-400">
                    <Lock className="w-5 h-5" />
                    <h2>{t("advancedSecurity")}</h2>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    {t("advancedDescription")}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed">
                    {t("requestSaml")}
                </button>
            </section>
        </div>
    );
}
