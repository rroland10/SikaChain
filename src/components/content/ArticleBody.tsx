export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n").filter(Boolean);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {paragraphs.map((para) => (
        <p key={para.slice(0, 48)} className="leading-relaxed text-sika-cream/78">
          {para}
        </p>
      ))}
    </div>
  );
}
