import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-sm font-semibold">
            <Image
              src="/logo.jpg"
              width={40}
              height={40}
              alt="Logo"
              priority
              className="rounded-xl object-cover"
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">EventPilot</div>

            <div className="text-xs text-white/50">AI event organiser</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            className="text-sm text-white/70 hover:text-white"
            href="/features"
          >
            Features
          </Link>

          <Link
            className="text-sm text-white/70 hover:text-white"
            href="/pricing"
          >
            Pricing
          </Link>

          <Link
            className="text-sm text-white/70 hover:text-white"
            href="/about"
          >
            About
          </Link>

          <Link
            className="text-sm text-white/70 hover:text-white"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white md:inline-block"
          >
            Log in
          </Link>

          <Link
            href="#"
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white/90"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
