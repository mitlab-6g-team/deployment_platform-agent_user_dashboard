"use client";

import React from "react";
import PositionCard from "./positionCard";
import { useParams, useSearchParams } from "next/navigation";
import { useFetchPositions } from "./service";
import { useBackNavigation } from "@/app/backNavigation";

export default function PositionPage() {
  const { applicationName } = useParams();
  const applicationNameDecode = decodeURIComponent(applicationName);
  const searchParams = useSearchParams();
  const applicationUID = searchParams.get("applicationUID");

  const handleBackClick = useBackNavigation();
  const { positions, isLoading, triggerFetch } =
    useFetchPositions(applicationUID);

  return (
    <div className="mx-auto min-h-screen bg-gray-50 pt-32 px-40">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500">
              Applicaitons /
              <span className="text-black"> {applicationNameDecode}</span>
            </p>
            <div className="flex items-center mb-6 space-x-4">
              <button onClick={handleBackClick}>
                <img src="/application/vector_left.svg" />
              </button>
              <p className="text-3xl">Positions</p>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="space-y-4 max-h-[630px] overflow-y-auto">
            {positions.map((position) => (
              <PositionCard
                applicationName={applicationNameDecode}
                key={position.uid}
                position={position}
                onDelete={triggerFetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
