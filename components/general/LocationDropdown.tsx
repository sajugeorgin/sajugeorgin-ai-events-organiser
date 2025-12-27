"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { GB_STATES } from "@/types/states";
import { City } from "country-state-city";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Location = {
  city: string;
  state: string;
  stateIso: string;
  country: string;
};

interface LocationDropdownProps {
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
}

const LocationDropdown = ({ location, setLocation }: LocationDropdownProps) => {
  // STATE TO CONTROL OPEN/ CLOSE OF POPOVER
  const [stateOpen, setStateOpen] = useState<boolean>(false);
  const [cityOpen, setCityOpen] = useState(false);

  // ENGLAND, SCOTLAND, WALES, NORTHERN IRELAND
  const selectedState =
    GB_STATES.find((s) => s.name === location.state) ?? null;

  // DERIVE THE CITIES FROM THE STATE ISO CODE
  // MEMOISED BECAUSE THIS IS A LARGE COMPUTE
  const cities = useMemo(() => {
    if (!location.stateIso) return [];

    return City.getCitiesOfState("GB", location.stateIso) ?? [];
  }, [location.stateIso]);

  return (
    <div className="flex flex-col xl:flex-row gap-5 md:gap-6 lg:gap-7">
      {/* 1. STATE */}
      <div className="space-y-1.5">
        <Label>State:</Label>

        {/* SHADCN POPOVER COMPONENT */}
        <Popover open={stateOpen} onOpenChange={setStateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between cursor-pointer"
            >
              <span className="text-muted-foreground">
                {selectedState ? selectedState.name : "Select a state"}
              </span>

              <ChevronDown className="ml-2 size-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            {/* SHADCN COMMAND COMPONENT */}
            <Command>
              <CommandInput placeholder="Search states..." />

              <CommandEmpty>No results found.</CommandEmpty>

              <CommandList className="max-h-64 overflow-y-auto">
                {/* STATES */}
                <CommandGroup>
                  {GB_STATES.map((s) => (
                    <CommandItem
                      key={s.name}
                      value={`${s.name} ${s.isoCode}`}
                      onSelect={() => {
                        setLocation((prev) => ({
                          ...prev,
                          state: s.name,
                          stateIso: s.isoCode,
                          city: "",
                        }));
                        setStateOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {/* SHOW CHECK ICON ONLY FOR THE SELECTED STATE */}
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          location.state === s.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="truncate">{s.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 2. CITIES - BASED ON STATE */}
      <div className="space-y-1.5">
        <Label>City:</Label>

        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={cityOpen}
              disabled={!location.stateIso}
              className="w-full justify-between cursor-pointer"
            >
              <span className="text-muted-foreground">
                {location.city
                  ? location.city
                  : location.stateIso
                    ? "Select a city"
                    : "Select a state first"}
              </span>

              <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search cities..." />

              <CommandEmpty>No results found.</CommandEmpty>

              <CommandList className="max-h-64 overflow-y-auto">
                <CommandGroup>
                  {cities.map((c) => (
                    <CommandItem
                      key={`${c.name}-${c.stateCode}`}
                      value={c.name}
                      onSelect={() => {
                        setLocation((prev) => ({ ...prev, city: c.name }));
                        setCityOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          location.city === c.name ? "opacity-100" : "opacity-0"
                        )}
                      />

                      <span className="truncate">{c.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default LocationDropdown;
