export interface ServiceItem {
  title: string;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    title: "App & Infra Discovery",
    description:
      "Automated discovery of applications, platforms (OCP, AKS, EKS), and databases. Get a complete inventory of your IT estate.",
  },
  {
    title: "AI-Powered Modernization",
    description:
      "Intelligent assessment to determine the best 6R strategy (Re-host, Refactor, Re-platform) for your legacy workloads.",
  },
  {
    title: "Platform Engineering",
    description:
      "Build self-service registries that empower developers while ensuring governance, security, and compliance.",
  },
  {
    title: "Cloud Migration",
    description:
      "Seamless migration to AWS, Azure, GCP, or Hybrid clouds using automated pipelines and zero-downtime strategies.",
  },
  {
    title: "DevOps Transformation",
    description:
      "Implement best-in-class CI/CD pipelines, GitOps workflows, and automated testing frameworks.",
  },
  {
    title: "Site Reliability Engineering",
    description:
      "Establish SLOs/SLAs, implement observability stacks (Prometheus, Grafana), and ensure high availability.",
  },
];

export async function getServices(): Promise<ServiceItem[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(servicesData), 100);
  });
}
