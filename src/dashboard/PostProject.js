import { useState } from "react";
import CustomInputField from "../components/controls/CustomInputField";
import UploadMultipleImages from "../multer/UploadMultipleImages";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function PostProject() {
  const [formData, setFormData] = useState({
    project_title: "",
    project_images: [], // changed to array
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.project_title) {
      setErrors({ project_title: "Project title is required" });
      return;
    }
    if (!formData.project_images || formData.project_images.length === 0) {
      setErrors({ project_images: "At least one image is required" });
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      // Send POST request to API
        await axios.post(`${API_BASE}/projects`, {
          project_title: formData.project_title,
          project_images: formData.project_images,
        });


      setMessage("Project posted successfully!");
      // Reset form
      setFormData({ project_title: "", project_images: [] });
    } catch (err) {
      console.error(err);
      setMessage("Error posting project. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Callback for image upload
  const handleImagesUpload = (images) => {
    // images should be an array of filenames from UploadMultipleImages
    setFormData({ ...formData, project_images: images });
  };

  return (
    <div className="container mt-4">
      <h2>Post New Project</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mb-3">
            <CustomInputField
              label="Project Title"
              type="text"
              name="project_title"
              placeholder="Project Title"
              value={formData.project_title}
              errors={errors}
              setErrors={setErrors}
              setFormData={setFormData}
              colClass="col-md-6"
            />
          </div>

          <div className="col-12 mb-3">
            <UploadMultipleImages
              source="Select Project Images"
              onUpload={handleImagesUpload} // pass callback
            />
            {errors.project_images && (
              <div className="text-danger">{errors.project_images}</div>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
