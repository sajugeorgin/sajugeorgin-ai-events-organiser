export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="absolute inset-x-0 bottom-0 w-full border-t border-white/10">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-8 items-end justify-end md:items-center md:flex-row">
        <p className="text-sm text-white/80">
          © {year} EventPilot. All rights reserved.
        </p>

        <p className="text-xs text-white/50 md:hidden">
          Plan events faster with smart scheduling.
        </p>
      </div>
    </footer>
  );
}
