export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="studio-page-intro"><p className="studio-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>;
}
