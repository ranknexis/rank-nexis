import { getPageBySlug } from "@/actions/pages";
import { notFound } from "next/navigation";
import PageEditor from "../components/PageEditor";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function PageEditorPage({ params }: Props) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const { page, error } = await getPageBySlug(slug);

  if (error || !page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface/30 -m-10 p-10">
      <PageEditor initialPage={JSON.parse(JSON.stringify(page))} />
    </div>
  );
}
