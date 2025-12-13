import { useEffect, useState, useRef } from "react";
import UploadImage from "../multer/UploadImage";
import JoditEditor from "jodit-react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function EditAboutUs() {
const editor = useRef(null);
const [aboutData, setAboutData] = useState({ description: "", image: "" });
const [loading, setLoading] = useState(true);

useEffect(() => {
// Fetch existing about info
axios.get(`${API_BASE}/about-info`)
.then(res => {
setAboutData({
description: res.data.description || "",
image: res.data.image || ""
});
setLoading(false);
})
.catch(err => {
console.error("Error fetching about info:", err);
setLoading(false);
});
}, []);

const handleSave = async () => {
try {
await axios.put(`${API_BASE}/about-info`, aboutData);
alert("About page updated successfully!");
} catch (err) {
console.error("Error updating about page:", err);
alert("Failed to update about page.");
}
};

if (loading) return <div>Loading...</div>;

return ( <div className="container my-4"> <h2>Edit About Page</h2>

  <div className="mb-3">
    <label className="form-label">Description</label>
    <JoditEditor
      ref={editor}
      value={aboutData.description}
      onChange={newContent => setAboutData({ ...aboutData, description: newContent })}
    />
  </div>

  <div className="mb-3">
    <UploadImage source="Select an Image"
      existingImage={aboutData.image ? `${IMAGE_BASE}/${aboutData.image}` : ""}
      onUpload={url => setAboutData({ ...aboutData, image: url })}
    />
    {/* Live preview */}
    {aboutData.image && (
      <div className="mt-3">
        <img
          src={aboutData.image.startsWith("http") ? aboutData.image : `${IMAGE_BASE}/${aboutData.image}`}
          alt="About Preview"
          style={{ maxWidth: "300px", maxHeight: "200px", borderRadius: "5px" }}
        />
      </div>
    )}
  </div>

  <button className="btn btn-primary" onClick={handleSave}>Save</button>
</div>


);
}
