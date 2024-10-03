import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EditModal } from "./applicationModal";
const ApplicationCard = ({ application, onEdit, onDelete }) => {
  const router = useRouter();
  const handlePositionsClick = () => {
    router.push(
      `/applications/${application.name}/positions?applicationUID=${application.uid}`
    );
  };

  const handleModelsClick = () => {
    router.push(
      `/applications/${application.name}/models?applicationUID=${application.uid}`
    );
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold p-1">{application.name}</h2>
        <p className="text-gray-500">Description：{application.description}</p>
        <p className="text-gray-500">
          Created Time：{application.created_time}
        </p>
      </div>
      <div className="flex space-x-8 px-5">
        <button onClick={handleEditClick}>
          <div className="transform  hover:scale-105 hover:bg-stone-200 transition-transform flex items-center bg-stone-200 rounded-lg p-2 border border-black text-black font-bold">
            <span>Details</span>
            {/* <img src="/application/vector_upperRight.svg" /> */}
          </div>
        </button>
        <button onClick={handlePositionsClick}>
          <div className="transform  hover:scale-105 hover:bg-blue-200 transition-transform flex items-center bg-blue-100 rounded-lg p-2 border border-blue-500 text-blue-500 font-bold">
            <span>Positions</span>
            <img src="/application/vector_upperRight.svg" />
          </div>
        </button>
        <button onClick={handleModelsClick}>
          <div className="transform  hover:scale-105 hover:bg-blue-200 transition-transform flex items-center bg-blue-100 rounded-lg p-2 border border-blue-500 text-blue-500 font-bold">
            <span>Models</span>
            <img src="/application/vector_upperRight.svg" />
          </div>
        </button>
      </div>
      {isEditModalOpen && (
        <EditModal
          application={application}
          onClose={handleCloseEditModal}
          applicationName={application.name}
        />
      )}
    </div>
  );
};

export default ApplicationCard;
