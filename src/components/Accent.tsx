import type { ReactNode } from "react";

export default function Accent({ text }: { text: string }) {
  const parts = text.split("*");
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-serif italic font-normal">
        {part}
      </em>
    ) : (
      part
    )
  );
  return <>{nodes}</>;
}
