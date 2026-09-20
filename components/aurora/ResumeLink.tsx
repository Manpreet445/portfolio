import { ArrowDown } from "@/components/aurora/icons";
import { profile } from "@/data/projects";

/** Hidden until an actual résumé asset is configured. */
export default function ResumeLink({ className = "" }: { className?: string }) {
  if (!profile.resume) return null;

  return (
    <a
      href={profile.resume.href}
      download={profile.resume.fileName}
      className={`btn-pixel action-link inline-flex gap-2 min-h-12 items-center justify-center bg-raised px-4 py-3 text-sm font-bold text-fog ${className}`}
    >
      Download résumé <ArrowDown className="h-4 w-4" />
    </a>
  );
}
