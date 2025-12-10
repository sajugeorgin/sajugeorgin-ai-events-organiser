"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ExplorePage = () => {
  const data = useQuery(api.events.getFeaturedEvents, { limit: 3 });
  console.log(data);
  return (
    <div className="max-w-7xl overflow-hidden">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExplorePage;
