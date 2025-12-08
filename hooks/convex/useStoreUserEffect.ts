import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useStoreUserEffect() {
  // Convex auth status for the current browser session.
  // isAuthenticated means Convex has a valid auth token (from Clerk).
  const { isLoading, isAuthenticated } = useConvexAuth();

  // Clerk user object. Used only to detect identity changes (user?.id).
  const { user } = useUser();

  // Tracks whether the backend has created or found the matching user document.
  // When this becomes non-null, the "store user" step is complete.
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  // Server write function. This calls convex/users.ts -> store mutation.
  const storeUser = useMutation(api.users.store);

  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // Do nothing until the user is signed in and Convex sees the auth token.
    if (!isAuthenticated) {
      return;
    }

    // Store the user in the database.
    // Ensure the current signed in user exists in Convex `users`.
    // No args needed. The mutation reads identity from ctx.auth on the server.
    async function addUserToDatabase() {
      const id = await storeUser();
      setUserId(id);
    }

    addUserToDatabase(); // Call the create user function

    // If the component unmounts or the user changes, reset local state.
    return () => setUserId(null); // Cleanup function

    // Rerun when:
    // - Convex auth flips to authenticated
    // - Clerk user identity changes (sign out, sign in as someone else)
    // - storeUser function reference changes
  }, [isAuthenticated, storeUser, user?.id]);

  // Treat the app as "loading" until:
  // - Convex finishes auth loading, and
  // - if authenticated, the user row is stored and we have userId
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}
