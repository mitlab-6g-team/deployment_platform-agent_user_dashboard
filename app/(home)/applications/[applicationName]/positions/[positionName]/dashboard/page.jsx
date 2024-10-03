"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useBackNavigation } from "@/app/backNavigation";

export default function DashboardPage() {
  const { projectName, applicationName, positionName } = useParams();
  const proejectNameDecode = decodeURIComponent(applicationName);
  const applicationNameDecode = decodeURIComponent(applicationName);
  const positionNameDecode = decodeURIComponent(positionName);
  const searchParams = useSearchParams();
  const applicationUID = searchParams.get("applicationUID");
  const handleBackClick = useBackNavigation();

  return (
    <div className="mx-auto min-h-screen bg-gray-50 pt-32 px-40">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500">
              Applications / {applicationNameDecode} /{" "}
              <span className="text-black">Positions</span>
            </p>
            <div className="flex items-center mb-6 space-x-4">
              <button onClick={handleBackClick}>
                <img src="/application/vector_left.svg" />
              </button>
              <p className="text-3xl">{positionNameDecode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
