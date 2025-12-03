export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 items-end md:flex-row md:justify-between">
        <p className="text-sm">
          © {year} EventPilot. All rights reserved.
        </p>

        <p className="text-xs text-gray-500">
          Plan events faster with smart scheduling.
        </p>
      </div>
    </footer>
  );
}
