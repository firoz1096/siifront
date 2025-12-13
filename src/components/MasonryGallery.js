import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

const MasonryGallery = () => {
  const [projects, setProjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/projects`);
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const closeLightbox = () => setSelectedImage(null);

  const prevImage = useCallback(() => {
    const { projectIndex, imageIndex } = selectedImage;
    const images = projects[projectIndex].project_images;
    setSelectedImage({
      projectIndex,
      imageIndex: imageIndex === 0 ? images.length - 1 : imageIndex - 1,
    });
  }, [selectedImage, projects]);

  const nextImage = useCallback(() => {
    const { projectIndex, imageIndex } = selectedImage;
    const images = projects[projectIndex].project_images;
    setSelectedImage({
      projectIndex,
      imageIndex: imageIndex === images.length - 1 ? 0 : imageIndex + 1,
    });
  }, [selectedImage, projects]);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, prevImage, nextImage]);

  const handleTouchStart = (e) => (touchStartX.current = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) nextImage();
    if (touchStartX.current - touchEndX.current < -50) prevImage();
  };

  return (
    <div>
      {projects.map((project, projectIndex) => (
        <div key={project.id} className="masonry_gallery_section">
          <h2>{project.project_title}</h2>
          <div className="masonry pt-3">
            {project.project_images.map((img, imageIndex) => {
              const fullImage = `${IMAGE_BASE}${img}`;
              return (
                <div key={imageIndex} className="masonry-item">
                  <div className="image-wrapper">
                    <img
                      src={fullImage}
                      alt=""
                      className="gallery-img"
                      onClick={() =>
                        setSelectedImage({ projectIndex, imageIndex })
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div onClick={(e) => e.stopPropagation()}>

            <img
              src={
                IMAGE_BASE +
                projects[selectedImage.projectIndex].project_images[
                  selectedImage.imageIndex
                ]
              }
              alt="large"
              className="lightbox-img"
            />

            {/* IMAGE COUNTER */}
            <div className="lightbox-counter">
              {selectedImage.imageIndex + 1} / {projects[selectedImage.projectIndex].project_images.length}
            </div>

            {/* BUTTONS */}
            <button
              className="close-btn"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              &times;
            </button>
            <button
              className="arrow left-arrow"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              &#10094;
            </button>
            <button
              className="arrow right-arrow"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonryGallery;
