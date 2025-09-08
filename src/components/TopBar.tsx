"use client";

import { Button } from "@/components/ui/button";

const JarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 8H18"
      stroke="#171717"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 8C17 5.79086 15.2091 4 13 4H11C8.79086 4 7 5.79086 7 8V10C7 10 7 10 7 10H17C17 10 17 10 17 10V8Z"
      stroke="#171717"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10V18C7 19.1046 7.89543 20 9 20H15C16.1046 20 17 19.1046 17 18V10"
      stroke="#171717"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-stroke bg-bg/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <JarIcon className="h-6 w-6" />
          <span className="ml-2 font-heading text-lg font-bold">
            Aztec Tip Jar
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="outline"
            className="rounded-full border-[2.5px] bg-card px-4 py-2 text-sm font-bold shadow-none"
          >
            Connect
          </Button>
        </div>
      </div>
    </header>
  );
};