export default function PitchFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:px-12 lg:px-16">
        <span className="font-semibold text-foreground">Astromar Logistics &middot; FTWZ India</span>
        <span>
          <a href="tel:+919940211014" className="hover:text-primary">+91 99402 11014</a>
          <span className="mx-2 text-border">|</span>
          <a href="mailto:sales@astromarfreezone.com" className="hover:text-primary">sales@astromarfreezone.com</a>
        </span>
      </div>
    </footer>
  );
}
