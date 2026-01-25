import { redirect } from "next/navigation";

export default function ResourcesPage({ params: { locale } }: { params: { locale: string } }) {
  redirect(`/${locale}/docs`);
}
