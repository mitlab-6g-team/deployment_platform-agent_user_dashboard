import React, { useState } from "react";
import { ModalInput } from "@/app/modalComponent";

export const EditModal = ({
  application,
  onClose,
  onEdit,
  applicationName,
}) => {
  const [formData, setFormData] = useState({
    name: application.name,
    description: application.description,
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Application</h2>
        <ModalInput label="Model" value={applicationName} readOnly />
        <ModalInput label="UID" value={application.uid} readOnly />
        <ModalInput label="Token" value={application.token} readOnly />
        <ModalInput
          label="Name"
          name="name"
          value={formData.name}
          // onChange={handleInputChange}
          readOnly
        />
        <ModalInput
          label="Description"
          name="description"
          value={formData.description}
          // onChange={handleInputChange}
          readOnly
        />
        <ModalInput
          label="Created Time"
          value={application.created_time}
          readOnly
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
