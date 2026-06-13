"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { tapeIn } from "@/lib/motion";
import Mockup from "./Mockup";
import type { ProjectImage } from "@/data/projects";

/** A printed photo / mockup taped into the notebook — slight tilt, soft shadow. */
export default function TapedPhoto({
  image,
  className = "",
  tapeTone = "bg-sun/80",
}: {
  image: ProjectImage;
  className?: string;
  tapeTone?: string;
}) {
  const rotate = image.rotate ?? 0;

  return (
    <motion.figure
      variants={tapeIn(rotate)}
      whileHover={{ y: -8, rotate: rotate * 0.4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className={`group relative ${className}`}
      style={{ rotate }}
    >
      {/* washi tape corners */}
      <span
        className={`washi absolute -top-2 left-3 z-10 h-5 w-14 -rotate-6 rounded-[2px] ${tapeTone} shadow-sm`}
      />
      <span
        className={`washi absolute -top-2 right-3 z-10 h-5 w-14 rotate-6 rounded-[2px] ${tapeTone} shadow-sm`}
      />

      {/* printed photo: thick white border + soft multi-layer shadow */}
      <div
        className="overflow-hidden rounded-[3px] border-[6px] border-white bg-white"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-cream">
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover"
            />
          ) : (
            <Mockup image={image} />
          )}
        </div>
      </div>
    </motion.figure>
  );
}
