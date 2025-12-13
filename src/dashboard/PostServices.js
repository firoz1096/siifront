import { useState, useRef } from "react";
import axios from "axios";
import UploadImage from "../multer/UploadImage";
import JoditEditor from "jodit-react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function PostServices() {
const editor = useRef(null);
const [serviceName, setServiceName] = useState("");
const [serviceDes, setServiceDes] = useState("");
const [serviceImage, setServiceImage] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();

if (!serviceName.trim()) return alert("Please enter service name");
if (!serviceDes.trim()) return alert("Please enter service description");
if (!serviceImage) return alert("Please upload service image");

try {
  await axios.post(`${API_BASE}/services`, {
    service_name: serviceName,
    service_des: serviceDes,
    service_image: serviceImage,
  });

  alert("Service added successfully!");
  setServiceName("");
  setServiceDes("");
  setServiceImage("");
} catch (err) {
  console.error(err);
  alert("Failed to add service");
}

};

return (
<div className="container py-5">
Add New Service

  <form onSubmit={handleSubmit}>
    {/* Service Name */}
    <div>
      <label>Service Name:</label>
      <input
        type="text"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
      />
    </div>

    {/* Description */}
    <div style={{ marginBottom: "20px" }}>
      <label>Service Description:</label>
      <JoditEditor
        ref={editor}
        value={serviceDes}
        onChange={(newContent) => setServiceDes(newContent)}
      />
    </div>

    {/* Image Upload */}
    <div style={{ marginBottom: "20px" }}>
      <label>Service Image:</label>

      <UploadImage
        source="Upload Service Image"
        onUpload={(url) => setServiceImage(url)}
      />

      {/* Live Preview */}
      {serviceImage && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={
              serviceImage.startsWith("http")
                ? serviceImage
                : `${IMAGE_BASE}/${serviceImage}`
            }
            alt="preview"
            style={{ maxWidth: "200px", borderRadius: "5px" }}
          />
        </div>
      )}
    </div>

    <button type="submit" style={{ padding: "10px 20px" }}>
      Add Service
    </button>
  </form>
</div>

);
}