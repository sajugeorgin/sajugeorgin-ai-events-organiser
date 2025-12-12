import { OptionalRestArgsOrSkip, useMutation, useQuery } from "convex/react";
import {
  FunctionReference,
  FunctionReturnType,
  OptionalRestArgs,
} from "convex/server";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// FOR ALL TYPESCRIPT TYPES I REFERRED TO THE USEQUERY & USEMUTATION HOOKS PROVIDED BY CONVEX

export function useConvexQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgsOrSkip<Query>
): {
  data: FunctionReturnType<Query> | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const result = useQuery(query, ...args);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (result === undefined) {
      setIsLoading(true);
    } else {
      try {
        setData(result);
        setError(null);
      } catch (err: unknown) {
        const error =
          err instanceof Error
            ? err
            : new Error("Something went wrong with the query.");
        setError(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [result]);

  return { data, isLoading, error };
}

export function useConvexMutation<
  Mutation extends FunctionReference<"mutation">,
>(mutation: Mutation) {
  const mutationFunction = useMutation(mutation);

  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (...args: OptionalRestArgs<Mutation>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mutationFunction(...args);
      setData(response);
      return response;
    } catch (err: unknown) {
      const error =
        err instanceof Error
          ? err
          : new Error("Something went wrong with the mutation.");
      setError(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
}
