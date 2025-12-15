import { Event } from "@/types/events";
import { Calendar, MapPin, Trash2, Users } from "lucide-react";
import { extractUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";
import { getCategoryIcon } from "@/lib/data";
import { Id } from "@/convex/_generated/dataModel";

interface EventsProps {
  events: Event[];
  user: User | null | undefined;
  onDelete?: (eventId: Id<"events">) => void;
  showUserActions?: boolean;
}

const Events = ({ events, user, onDelete, showUserActions }: EventsProps) => {
  // ROUTER FOR NAVIGATION
  const router = useRouter();

  // GET THE AUTHENTICATED USER'S LOCATION
  const city = user?.location?.city;

  // HANDLE EVENT CLICK
  const handleEventClick = (slug: string) => {
    router.push(`/explore/${slug}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADER */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center size-10 rounded-lg bg-linear-to-br from-blue-200 to-cyan-500">
            <MapPin className="size-5" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">Events Near You</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground ml-[55px]">
          Discover what&apos;s happening in {city || "your local area"}
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="group relative overflow-hidden rounded-2xl p-0 border-white/10 bg-slate-700 dark:bg-slate-900 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-101 hover:shadow-2xl hover:shadow-purple-500/10"
            onClick={() => handleEventClick(event.slug)}
          >
            <CardContent className="p-0">
              {/* EVENT IMAGE */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                {event.coverImage ? (
                  <>
                    <Image
                      src={extractUrl(event.coverImage)}
                      alt={event.title}
                      fill
                      priority
                      className="object-cover hover:scale-105 duration-300 transition-all"
                    />

                    {/* GRADIENT OVERLAY TO DARKEN IMAGE */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-700 dark:from-slate-900 via-slate-700/10 dark:via-slate-900/10 to-transparent" />
                  </>
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${event.themeColor}60 0%, ${event.themeColor}30 100%)`,
                    }}
                  >
                    {getCategoryIcon(event.category)}
                  </div>
                )}

                {/* CATEGORY BADGE - POSITIONED ON IMAGE */}
                <div className="absolute top-4 left-4">
                  <Badge className="border border-white/30 px-3 py-1 text-xs">
                    {event.category}
                  </Badge>
                </div>

                {/* TICKET PRICE BADGE - POSITIONED ON IMAGE */}
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`backdrop-blur-sm border px-3 py-1 text-xs ${
                      event.ticketType === "free"
                        ? "bg-emerald-500/20 border-emerald-500/30"
                        : "bg-purple-500/20 border-purple-500/30"
                    }`}
                  >
                    {event.ticketType === "free"
                      ? "Free"
                      : `£${event.ticketPrice}`}
                  </Badge>
                </div>
              </div>

              {/* EVENT DETAILS */}
              <div className="p-5 md:p-6 space-y-4">
                {/* EVENT TITLE */}
                <h3 className="text-xl text-white md:text-2xl font-bold leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>

                {/* EVENT DESCRIPTION */}
                <p className="text-xs md:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                {/* EVENT META DATA */}
                <div className="space-y-2.5">
                  {/* DATE AND TIME */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                      <Calendar className="size-4 text-purple-300" />
                    </div>

                    <span className="text-xs md:text-sm text-slate-300">
                      {format(event.startDate, "EEE, dd MMM, HH:mm")}
                    </span>
                  </div>

                  {/* LOCATION */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                      <MapPin className="size-4 text-blue-300" />
                    </div>

                    <span className="text-xs md:text-sm text-slate-300">
                      {event.locationType === "online"
                        ? "Online Event"
                        : `${event.city}, ${event.state}`}
                    </span>
                  </div>

                  {/* REGISTRATION COUNT & CAPACITY */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-linear-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/30">
                      <Users className="size-4 text-orange-300" />
                    </div>

                    <span className="text-xs md:text-sm text-slate-300 ">
                      {event.registrationCount} / {event.capacity} attending
                    </span>
                  </div>
                </div>

                {/* EVENT ACTIONS */}
                {showUserActions && (
                  <div className="flex items-center gap-2">
                    {/* VIEW EVENT DETAILS */}
                    <Button className="flex-1 mt-4 cursor-pointer hover:scale-102 duration-300 transition-all bg-linear-to-r from-blue-700 to-cyan-500">
                      <span>View Details</span>
                    </Button>

                    {/* IF ONDELETE FUNCTION IS PASSED THEN DISPLAY DELETE ACTION */}
                    {onDelete && (
                      <Button
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();

                          onDelete(event._id);
                        }}
                        className="mt-4 cursor-pointer hover:text-muted"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EMPTY STATE */}
      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="flex items-center justify-center size-20 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
            <MapPin className="size-10 text-blue-300" />
          </div>

          <h3 className="text-2xl font-bold  mb-2">No Local Events Found</h3>

          <p className="text-slate-400 text-center max-w-md">
            We couldn&apos;t find any events in your area right now. Check back
            soon or explore events in other locations!
          </p>
        </div>
      )}
    </section>
  );
};

export default Events;
