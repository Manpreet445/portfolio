import Image from "next/image";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { RevealGroup, RevealItem, SectionHeading } from "@/components/aurora/Reveal";
import { ArrowUpRight, GitHub } from "@/components/aurora/icons";
import ReactiveSurface from "@/components/aurora/ReactiveSurface";

const STATUS: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live app", className: "text-mint" },
  completed: { label: "Completed", className: "text-mint" },
  "in-development": { label: "In development", className: "text-ember-bright" },
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="action-link text-ember-bright">
        Visit live app <ArrowUpRight className="h-4 w-4" />
        <span className="sr-only"> — {project.title} (opens in a new tab)</span>
      </a>}
      {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="action-link text-mist">
        <GitHub className="h-4 w-4" /> View source
        <span className="sr-only"> — {project.title} (opens in a new tab)</span>
      </a>}
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const image = project.images[0];
  if (!image) return null;
  return (
    <figure className={`project-media ${project.slug === "conveyor" ? "project-hardware" : ""}`}>
      <a href={image.src} target="_blank" rel="noreferrer" data-cursor="none"
        aria-label={`View full-size ${project.title} ${project.slug === "conveyor" ? "hardware photo" : "screenshot"} (opens in a new tab)`}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
          sizes={project.slug === "recepie" ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 55vw, 610px" : "(max-width: 767px) 35vw, 180px"} />
        <span aria-hidden className="media-expand"><ArrowUpRight className="h-4 w-4" /></span>
      </a>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = STATUS[project.status];
  return (
    <ReactiveSurface className={`project-surface project-${project.slug}`}>
      <article aria-labelledby={`project-${project.slug}`} className="project-card">
        {project.slug === "recepie" && <ProjectMedia project={project} />}
        <div className="project-body">
          <div className="project-meta">
            <span className={status.className}><span aria-hidden className="mr-2">/</span>{status.label}</span>
            <span>{project.year}</span>
          </div>
          <div className="project-title-row">
            <div>
              {project.context && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ember-bright">{project.context}</p>}
              <h3 id={`project-${project.slug}`} className="project-title">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{project.role}</p>
            </div>
            <span aria-hidden className="project-number">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="project-description-row">
            {project.slug === "conveyor" && <ProjectMedia project={project} />}
            <p className="text-sm leading-relaxed text-mist md:text-base">{project.description}</p>
          </div>
          {project.detail && <details className="project-detail">
            <summary>Engineering notes <span aria-hidden>+</span></summary>
            <p className="pt-3 text-sm leading-relaxed text-mist">{project.detail}</p>
          </details>}
          <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.tags.map(tag => <li key={tag} className="tech-chip">{tag}</li>)}
          </ul>
          {(project.live || project.repo) && <ProjectLinks project={project} />}
        </div>
      </article>
    </ReactiveSurface>
  );
}

export default function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="section-intro">
          <SectionHeading id="work-title" eyebrow="01 · Selected work" title={"Different problems.\nSame *curiosity.*"} />
          <p className="max-w-sm text-base leading-relaxed text-mist">
            From a pantry-first web app to a physical sorting rig. Personal projects and team-based coursework, with my part in each.
          </p>
        </div>
        <RevealGroup className="work-grid mt-10">
          {projects.map((project, index) => (
            <RevealItem key={project.slug} className={`work-slot work-slot-${project.slug}`}>
              <ProjectCard project={project} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
