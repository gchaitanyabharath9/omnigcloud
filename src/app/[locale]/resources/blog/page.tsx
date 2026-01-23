import { redirect } from 'next/navigation';

export default function ResourcesBlogPage({ params: { locale } }: { params: { locale: string } }) {
    redirect(`/${locale}/blog`);
}
