import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const UploadDialog = ({ show, onHide, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    if (selectedFile.size > 1024 * 1024) {
      // 1MB size limit
      alert("File size exceeds the 1MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    try {
      const response = await fetch(`${BACKEND_URL}/profiles/${userId}/upload`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful response. Close modal windows after upload.
      console.log("Uploaded successfully");
      onHide(); // Close the modal after successful upload
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred during upload. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Image</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleUpload}>
          <p>Select an image to upload as your profile picture.</p>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*" // Optional: Restrict to image files
          />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadDialog;
