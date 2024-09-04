import React, { useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "/utils";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleSuccess("file is uploaded successfully");
    } catch (error) {
      handleError("Error uploading file", error);
    }
  };

  return (
    <>
      <div className="card w-50 my-4 ">
        <div className="card-header">Upload your excel or csv file</div>
        <div className="card-body ">
          <input
            type="file"
            className="btn btn-light"
            onChange={handleFileChange}
          />
          <button className="btn btn-success" onClick={handleFileUpload}>
            Upload
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default FileUpload;
