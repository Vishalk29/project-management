import React from "react";
import type { Route } from "../../+types/root";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { SIGN_IN, SIGN_UP, WELCOME_NOTE } from "@/lib/constants";

const HomePage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 ">
      {/* Gradient Heading */}
      <h2 className="text-4xl md:text-5xl font-thin bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-12">
        {WELCOME_NOTE}
      </h2>

      {/* Buttons side by side */}
      <div className="flex gap-4">
        <Link to={PUBLIC_ROUTES.SIGN_IN}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
            {SIGN_IN}
          </Button>
        </Link>
        <Link to={PUBLIC_ROUTES.SIGN_UP}>
          <Button
            variant="outline"
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg shadow-md"
          >
            {SIGN_UP}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
