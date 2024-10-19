import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import AccountNav from "./AccountNav";

export default function PlacesPage() {
 
  return (
    <div>
      <AccountNav/>
    
        <div className="text-center">
          <Link
            className="bg-primary inline-flex justify-center gap-1  text-white font-medium rounded-full px-6 py-2"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      

    </div>
  );
}
