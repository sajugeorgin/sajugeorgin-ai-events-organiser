import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IExploreEvent } from "@/types/events";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { extractUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { format } from "date-fns";

type FeaturedEventsCarouselProps = {
  featuredEvents: IExploreEvent[];
  loadingEvents?: boolean;
};

const FeaturedEventsCarousel = ({
  featuredEvents,
}: FeaturedEventsCarouselProps) => {
  // LISTEN TO EVENTS ON THE CAROUSEL USING THE API INSTANCE FROM SETAPI
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // ROUTER FOR ROUTING (IN EVENT HANDLER)
  const router = useRouter();

  // CAROUSEL AUTOPLAY PLUGIN
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  // RUN THIS SIDE EFFECT EVERY TIME THE API STATE CHANGES
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    // LISTEN TO THE SELECT EVENT
    api.on("select", () => {
      // UPDATE THE CURRENT COUNT
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // HANDLE EVENT CLICK
  const handleEventClick = (slug: string) => {
    router.push(`/explore/${slug}`);
  };

  return (
    <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ align: "center", loop: true }}
        className="w-full rounded-2xl"
      >
        <CarouselContent>
          {featuredEvents?.map((event) => (
            <CarouselItem key={event._id}>
              <div
                className="group cursor-pointer relative overflow-hidden rounded-2xl md:rounded-3xl"
                onClick={() => handleEventClick(event.slug)}
              >
                {/* DISPLAY EVENT COVER IMAGE - POSITIONED ABSOLUTELY AS BACKGROUND */}
                {event.coverImage ? (
                  <div className="absolute inset-0">
                    <Image
                      src={extractUrl(event.coverImage)}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      quality={100}
                    />

                    {/* DARKEN THE IMAGE SO THAT USERS CAN SEE OVERLAYED TEXT/ INFORMATION */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  </div>
                ) : (
                  // OTHERWISE DISPLAY THE EVENT THEMECOLOR STORED IN CONVEX
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${event.themeColor}40 0%, ${event.themeColor}20 100%)`,
                    }}
                  />
                )}

                <Card className="relative border-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10">
                      {/* TOP ROW */}
                      <div className="mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                        <Badge className="bg-linear-to-r from-purple-500 to-pink-500 border-0 px-3 md:px-4 py-1 md:py-1.5 text-xs font-medium text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-shadow">
                          ✨ Featured
                        </Badge>

                        {/* EVENT CATEGORY */}
                        <Badge className="backdrop-blur-sm bg-white/10 border border-white/30 px-3 md:px-4 py-1 md:py-1.5 text-xs font-medium text-white hover:bg-white/15 transition-colors">
                          {event.category}
                        </Badge>
                      </div>

                      {/* EVENT TITLE */}
                      <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                          {event.title}
                        </h3>

                        {/* EVENT DESCRIPTION - PREVIEW (LINE-CLAMP-2) */}
                        <p className="line-clamp-2 text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed max-w-2xl">
                          {event.description}
                        </p>
                      </div>

                      {/* EVENT META DATA */}
                      <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                        {/* EVENT DATE  */}
                        <div className="flex items-center gap-2 md:gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                          <div className="flex items-center justify-center size-8 md:size-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 shrink-0">
                            <Calendar className="size-4 text-white" />
                          </div>

                          {/* FORMATTED DATE */}
                          <span className="text-xs md:text-sm font-medium text-white truncate">
                            {format(event.startDate, "PPP")}
                          </span>
                        </div>

                        {/* EVENT LOCATION - CITY & COUNTRY */}
                        <div className="flex items-center gap-2 md:gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                          <div className="flex items-center justify-center size-8 md:size-10 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20 shrink-0">
                            <MapPin className="size-4 text-white" />
                          </div>

                          <span className="text-xs md:text-sm font-medium text-white">
                            {event.city}, {event.state}, {event.country}
                          </span>
                        </div>

                        {/* EVENT TICKET DETAILS - FREE ENTRY OR PAID */}
                        <div className="flex items-center gap-2 md:gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                          <div className="flex items-center justify-center size-8 md:size-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 shrink-0">
                            <Ticket className="size-4 text-white" />
                          </div>

                          <span className="text-xs md:text-sm font-medium text-white capitalize truncate">
                            {event.ticketType === "free"
                              ? "Free Entry"
                              : `From £${event.ticketPrice ?? 0}`}
                          </span>
                        </div>

                        {/* EVENT CAPACITY AND REGISTRATION COUNT */}
                        <div className="flex items-center gap-2 md:gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                          <div className="flex items-center justify-center size-8 md:size-10 rounded-lg bg-linear-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/20 shrink-0">
                            <Users className="size-4 text-white" />
                          </div>

                          <span className="text-xs md:text-sm font-medium text-white truncate">
                            {event.registrationCount} / {event.capacity}{" "}
                            attending
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-12 md:-left-16 size-10 md:size-12 cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl" />
        <CarouselNext className="-right-12 md:-right-16 size-10 md:size-12 cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl" />
      </Carousel>

      <div className="mt-6 md:mt-8 flex items-center justify-center gap-1.5 md:gap-2">
        {featuredEvents?.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 md:h-2 rounded-full cursor-pointer transition-all duration-300 ${
              current === index + 1
                ? "w-6 md:w-8 bg-linear-to-r from-purple-500 to-pink-500 shadow-2xl shadow-purple-500"
                : "w-1.5 md:w-2 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventsCarousel;
