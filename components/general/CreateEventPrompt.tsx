import { Button } from "@/components/ui/button";
import { Plus, Sparkles, LocationEdit } from "lucide-react";
import Link from "next/link";

const CreateEventPrompt = () => {
  return (
    <div className="mt-10 relative max-w-7xl mx-auto overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm p-8 md:p-12">
      {/* ANIMATED BACKGROUND GLOWING ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 size-64 bg-purple-500/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 size-64 bg-pink-500/30 rounded-full blur-2xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* ICON */}
        <div className="mb-6 relative">
          <div className="flex items-center justify-center size-20 rounded-2xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
            <LocationEdit className="w-10 h-10 text-purple-400" />
          </div>

          {/* FLOATING SPARKLE */}
          <div className="absolute -top-2 -right-2 size-8 flex items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-400 animate-bounce">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3">No Events Yet</h3>

        {/* DESCRIPTION */}
        <p className="text-sm md:text-base mb-8 leading-relaxed">
          Be the first to create an event in your area!
        </p>

        {/* CTA BUTTON */}
        <Link href="/create-event">
          <Button className="group bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-purple-500/30 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 border-0">
            <Plus className="size-5 transition-transform group-hover:rotate-90 duration-300" />

            <span>Create Event</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEventPrompt;
