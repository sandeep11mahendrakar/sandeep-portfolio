import Image from "next/image";
import type { ProjectMedia } from "@/lib/profile";
import { hasPublicFile } from "@/lib/profile";

function Placeholder({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-paper-deep to-paper text-center ${
        compact ? "aspect-[16/10]" : "aspect-[16/10]"
      }`}
    >
      <span
        aria-hidden
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
      >
        Project Preview
      </span>
      <span aria-hidden className="h-px w-16 bg-line" />
    </div>
  );
}

export default function MediaRenderer({
  media,
  priority = false,
  showPlaceholder = true,
  sizes,
}: {
  media?: ProjectMedia;
  priority?: boolean;
  showPlaceholder?: boolean;
  sizes?: string;
}) {
  if (!media || !hasPublicFile(media.src)) {
    return showPlaceholder ? <Placeholder /> : null;
  }

  if (media.type === "video") {
    const posterAvailable = hasPublicFile(media.poster);
    return (
      <video
        src={media.src}
        poster={posterAvailable ? media.poster : undefined}
        autoPlay={media.autoplay && !media.controls}
        muted={media.muted}
        loop={media.loop}
        playsInline
        controls={media.controls}
        preload={media.autoplay && !media.controls ? "auto" : "metadata"}
        className="h-auto w-full object-cover"
      />
    );
  }

  const alt =
    media.alt && !/^\[ADD/i.test(media.alt.trim())
      ? media.alt
      : "Project preview";

  return (
    <Image
      src={media.src}
      alt={alt}
      width={920}
      height={575}
      priority={priority}
      sizes={sizes}
      className="h-auto w-full object-cover"
    />
  );
}
