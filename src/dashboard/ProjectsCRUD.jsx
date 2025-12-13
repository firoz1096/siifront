import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";
const IMAGE_BASE = "http://localhost:5000";

const ProjectsCRUD = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/projects`);
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete a project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_BASE}/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Projects List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{project.project_title}</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {project.project_images.map((img, i) => (
                  <img
                    key={i}
                    src={`${IMAGE_BASE}${img}`}
                    alt=""
                    width="100"
                    style={{ margin: "5px", borderRadius: "5px" }}
                  />
                ))}
              </div>
              <button
                onClick={() => handleDelete(project.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsCRUD;
