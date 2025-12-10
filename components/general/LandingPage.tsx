import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const LandingPage = () => {
  return (
    <section className="pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="flex flex-col items-start gap-5">
          <span className="text-gray-500 font-light tracking-wide">
            eventive<span className="text-purple-400">*</span>
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-wide">
            Discover & <br /> Create Amazing <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
              Events.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light">
            Eventive makes every event memorable. Join our community today!
          </p>

          <Link href="/explore">
            <Button
              size="lg"
              className="rounded-full text-lg hover:scale-103 duration-300 transition-all cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-start overflow-hidden">
          <Image
            src="/hero2.gif"
            alt="Hero Image"
            width={700}
            height={700}
            className="w-full h-auto hover:scale-105 duration-300 transition-all"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
