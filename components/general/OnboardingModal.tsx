"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useConvexMutation } from "@/hooks/convex/useConvexQuery";
import { api } from "@/convex/_generated/api";
import LocationDropdown from "./LocationDropdown";
import { toast } from "sonner";
import { ArrowLeftIcon } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean | null | undefined;
  onClose: () => void;
  onComplete: () => void;
}

type Category = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

type Location = {
  city: string;
  state: string;
  stateIso: string;
  country: string;
};

const OnboardingModal = ({
  isOpen,
  onClose,
  onComplete,
}: OnboardingModalProps) => {
  // TRACK CURRENT STEP
  const [step, setStep] = useState(1);

  // TRACK CATEGORIES - STEP 1
  // WHEN DECLARING STATES WITH [] TS INFERS INITIAL VALUE AS EMPTY SO never[] IS INFERRED
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // TRACK LOCATION - STEP 2
  const [location, setLocation] = useState<Location>({
    city: "",
    state: "",
    stateIso: "",
    country: "United Kingdom",
  });

  // CONVEX MUTATION TO PATCH INTERESTS (CATEGORY PREFERENCES) AND LOCATION DETAILS iN DB
  const { mutate: completeOnboarding, isLoading } = useConvexMutation(
    api.users.completeOnboarding
  );

  // USERS PROGRESS
  const progress = (step / 2) * 100;

  // HANDLE CATEGORY CLICK TO UPDATE
  const handleCategoryClick = (category: Category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category.id) // IF PREVIOUS STATE CONTAINS THE PASSED CATEGORY ID
          ? prev.filter((id) => id !== category.id) // RETURN ELEMENTS OF THE CONDITION SPECIFIED (REMOVE)
          : [...prev, category.id] // ADD
    );
  };

  // HANDLE COMPLETE ONBOARDING - ASYNC CONVEX MUTATION
  const handleCompletion = async () => {
    try {
      await completeOnboarding({
        location: {
          state: location.state,
          city: location.city,
          country: location.country,
        },
        interests: selectedCategories,
      });

      toast.success("Welcome to Eventive! 🎉");
      onComplete();
    } catch (error) {
      toast.error("Failed to complete onboarding.");
      console.error(error);
    }
  };

  // HANDLE MODAL BUTTON CLICK
  const handleNext = async () => {
    if (step === 1) {
      setStep((prev) => (prev += 1));
    }

    if (step === 2 && (!location.city || !location.state)) {
      toast.error("Please select both state and city.");
    }

    if (step === 2 && selectedCategories && location.city && location.state) {
      alert(
        `Submitted the following. Categorgies - ${selectedCategories}. Location - ${JSON.stringify(location)}`
      );
      await handleCompletion();
    }
  };

  // DEBUGGING:
  // useEffect(() => {
  //   console.log(selectedCategories);
  //   console.log(location);
  // }, [selectedCategories, location]);

  // STEP 2: DISABLED STATE
  let buttonDisabled;
  if (step === 2 && location.city.length === 0 && location.state.length === 0) {
    buttonDisabled = true;
  }

  return (
    // ALWAYS PASS A BOOLEAN TO OPEN SO THAT IT'S FULLY CONTROLLED
    // ONLY CALL onClose WHEN THE DIALOG IS CLOSING (OPEN BECOMES FALSE)
    <Dialog
      open={!!isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {/* DIALOG CONTENT */}
      <DialogContent className="sm:max-w-2xl">
        {/* HEADER */}
        <DialogHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-1 max-w-[95%]" />
          </div>

          <DialogTitle>
            {step === 1 ? (
              <div className="flex items-start gap-2">
                <span>What interests you?</span>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <span>Where are you located?</span>
              </div>
            )}
          </DialogTitle>

          <DialogDescription className="text-start">
            {step === 1 ? (
              <span>
                Select atleast 3 categories to personalise your experience.
              </span>
            ) : (
              <span>We&apos;ll show you events happening near you.</span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* MAIN CONTENT */}
        <div className="grid gap-4">
          {/* STEP 1 - DISPLAY CATEGORIES */}
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] lg:max-h-[400px] overflow-y-auto p-2">
                {CATEGORIES.map((category) => {
                  // CHECK IF CATEGORY IS IN STATE (SELECTED)
                  const selected = selectedCategories.includes(category.id);

                  return (
                    <Button
                      key={category.id}
                      variant="outline"
                      type="button"
                      className={cn(
                        "cursor-pointer justify-start gap-2 min-h-18",
                        selected &&
                          "border-2! border-purple-500! bg-purple-500/10! shadow-lg! shadow-purple-500/20!" // USE ! TO OVERIDE SHADCN VARIANT STYLING
                      )}
                      onClick={() => handleCategoryClick(category)} // PASS CATEGORY TO EVENT HANDLER
                    >
                      <div className="text-[15px]">
                        {category.icon} {category.label}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* DISPLAY THE NUMBER OF CATEGORIES SELECTED */}
              <div className="flex gap-2 items-center justify-between">
                <Badge
                  variant={
                    selectedCategories.length >= 3 ? "default" : "secondary"
                  }
                >
                  {selectedCategories.length} selected
                </Badge>

                {selectedCategories.length >= 3 && (
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-500">
                    Ready to continue
                  </span>
                )}
              </div>
            </div>
          ) : (
            // STEP 2: DISPLAY LOCATION SELECTION COMPONENT
            <LocationDropdown location={location} setLocation={setLocation} />
          )}
        </div>

        {/* MODAL FOOTER BUTTONS */}
        <DialogFooter className="flex items-center">
          {step > 1 && (
            <Button
              className="mt-2 flex items-center bg-red-500/80 cursor-pointer hover:bg-red-600/80"
              onClick={() => {
                setStep((prev) => (prev -= 1));
              }}
            >
              <ArrowLeftIcon />
              Back
            </Button>
          )}

          <Button
            className="cursor-pointer mt-2 flex-1 hover:bg-blue-600"
            onClick={handleNext}
            disabled={
              !(selectedCategories.length >= 3) || isLoading || buttonDisabled
            }
          >
            {isLoading
              ? "Completing..."
              : step === 2
                ? "Complete Onboarding"
                : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
