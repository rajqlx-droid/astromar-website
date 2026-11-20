import { notFound } from "next/navigation";
import DeckViewer from "@/components/pitch/DeckViewer";
import { pitchDecks } from "@/data/pitch";

export function generateStaticParams() {
  return pitchDecks.map((d) => ({ slug: d.slug }));
}

export default async function DeckPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ m?: string }>;
}) {
  const { slug } = await params;
  const { m } = await searchParams;
  const deck = pitchDecks.find((d) => d.slug === slug);
  if (!deck) notFound();
  const model = deck.models?.find((x) => x.key === m);
  const file = model ? `${deck.file}#${model.key}-flow` : deck.file;
  return <DeckViewer file={file} title={model ? `${deck.title} · ${model.label}` : deck.title} />;
}
