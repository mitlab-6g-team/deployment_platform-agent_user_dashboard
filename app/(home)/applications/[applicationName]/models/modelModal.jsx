import React, { useState, useEffect } from "react";
import { HandleUpdate } from "./service";
import { ModalInput } from "@/app/modalComponent";

export const EditModal = ({ model, onClose, onEdit, applicationUID }) => {
  const [formData, setFormData] = useState({
    position_name: "",
    inference_client_name: "",
    position_description: "",
    model_uid: model.uid,
    application_uid: applicationUID,
    resource_requirements: {
      cpu_requests: "",
      cpu_limits: "",
      memory_requests: "",
      memory_limits: "",
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // 檢查表單是否有效
    setIsFormValid(
      formData.position_name.trim() !== "" &&
        formData.inference_client_name.trim() !== ""
    );
  }, [formData]);

  // 暫存更新的value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeployClick = () => {
    if (isFormValid) {
      HandleUpdate(formData, onEdit, onClose);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Application</h2>
        <ModalInput
          label="Position Name"
          name="position_name"
          value={formData.position_name}
          onChange={handleInputChange}
          required
        />
        <ModalInput
          label="Inference Client"
          name="inference_client_name"
          value={formData.inference_client_name}
          onChange={handleInputChange}
          required
        />
        <ModalInput
          label="Description"
          name="position_description"
          value={formData.position_description}
          onChange={handleInputChange}
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDeployClick}
            className={`${
              isFormValid ? "bg-green-700" : "bg-gray-400 cursor-not-allowed"
            } text-white px-4 py-2 rounded-md font-bold`}
            disabled={!isFormValid}
          >
            Deploy
          </button>
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-bold"
          >
            Cancel
          </button>
        </div>
        {!isFormValid && (
          <p className="text-red-500 mt-2">
            Please fill in both fields to deploy.
          </p>
        )}
      </div>
    </div>
  );
};
