import { usePathname, useRouter } from "next/navigation";
import { useConvexQuery } from "./convex/useConvexQuery";
import { api } from "@/convex/_generated/api";

const LOOKOUT_PAGES = ["/explore", "/events", "my-ticketss"];

export function useOnboarding() {
  // CHECK THE CURRENT PATH
  const pathname = usePathname();

  // FOR ROUTING
  const router = useRouter();

  // GET THE AUTHENTICATED USER
  const { data: currentUser, isLoading } = useConvexQuery(
    api.users.getCurrentUser,
    {}
  );

  // DERIVE showOnboarding DIRECTLY - NO STATE NEEDED
  const showOnboarding =
    !isLoading &&
    currentUser &&
    !currentUser.hasCompletedOnboarding &&
    LOOKOUT_PAGES.some((page) => pathname.startsWith(page));

  // ONBOARDING COMPLETE
  const handleOnboardingComplete = () => {
    // REFRESH THE PAGE TO GET THE UPDATED USER DATA
    router.refresh();
  };

  // ONBOARDING SKIPPED
  const handleOnboardingSkip = () => {
    // FORWARD THE USER
    router.push("/");
  };

  // USER NEEDS ONBOARDING IF THEY HAVEN'T COMPLETED ONBOARDING
  const needsOnboarding = !isLoading && !currentUser?.hasCompletedOnboarding;

  return {
    showOnboarding,
    handleOnboardingComplete,
    handleOnboardingSkip,
    needsOnboarding,
  };
}
