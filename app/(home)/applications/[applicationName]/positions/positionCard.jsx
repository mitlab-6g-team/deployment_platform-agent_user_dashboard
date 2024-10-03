import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EditModal, DeleteModal } from "./positionModal";

export default function PositionCard({ applicationName, position, onDelete }) {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleApplicationClick = () => {
    router.push(
      `/applications/${applicationName}/positions/${position.name}/dashboard?applicationUID=${position.uid}`
    );
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <div className="bg-blue-300 rounded-lg p-0.5">{position.uid}</div>
        <h2 className="text-xl font-semibold p-1">{position.name}</h2>
        <p className="text-gray-500">Description：{position.description}</p>
        <p className="text-gray-500">Created Time：{position.created_time}</p>
        <p className="text-gray-500">
          Deployed Status：{position.deploy_status}
        </p>
      </div>
      <div className="space-x-8 px-5">
        <button onClick={handleDeleteClick}>
          <img src="/application/delete.svg" alt="Delete" />
        </button>
      </div>
      {isDeleteModalOpen && ( 
        <DeleteModal
          position={position}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
