import React, { useState } from "react";
import { EditModal } from "./modelModal";

export default function ModelCard({ applicationUID, model, onEdit, onDelete }) {
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
        <div className="bg-blue-300 rounded-lg p-0.5">{model.uid}</div>
        <h2 className="text-xl font-semibold p-1">{model.name}</h2>
        <p className="text-gray-500">Desription：{model.description}</p>
        <p className="text-gray-500">Performance：{model.accuracy}</p>
        <p className="text-gray-500">Model Version：{model.version}</p>
        <p className="text-gray-500">Created Time：{model.created_time}</p>
      </div>
      <div className="space-x-8 px-5">
        <button onClick={handleEditClick}>
          <div className="space-x-2 transform  hover:scale-105 hover:bg-stone-200 transition-transform flex items-center bg-stone-200 rounded-lg p-2 border border-black text-black font-bold">
            <img src="/application/deploy.svg" className="w-4" />
            <span>Deploy</span>
          </div>
        </button>
      </div>
      {isEditModalOpen && (
        <EditModal
          model={model}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
          applicationUID={applicationUID}
        />
      )}
    </div>
  );
}
