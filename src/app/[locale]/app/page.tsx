import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await auth();
  const t = await getTranslations("Dashboard");

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
        <p className="text-zinc-600 dark:text-zinc-400">
          {t("welcome")},{" "}
          <span className="font-semibold text-zinc-900 dark:text-white">{session.user?.name}</span>
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {t("role")}:{" "}
          <span className="uppercase font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
            {session.user?.role}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="font-semibold">{t("logicMeshStatus")}</h2>
          <p className="text-green-500 flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {t("active")}
          </p>
        </div>
      </div>
    </div>
  );
}
