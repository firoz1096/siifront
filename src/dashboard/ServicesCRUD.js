import { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2  } from "react-icons/fi";

import axios from "axios";
import JoditEditor from "jodit-react";
import UploadImage from "../multer/UploadImage";
import { Modal } from 'bootstrap';

const API_BASE = process.env.REACT_APP_API_BASE || "[http://localhost:5000/api](http://localhost:5000/api)";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "[http://localhost:5000](http://localhost:5000)";

export default function ServicesCRUD() {
const editor = useRef(null);

const [services, setServices] = useState([]);
const [loading, setLoading] = useState(true);

const [serviceId, setServiceId] = useState(null);
const [serviceName, setServiceName] = useState("");
const [serviceDes, setServiceDes] = useState("");
const [serviceImage, setServiceImage] = useState("");

const fetchServices = async () => {
try {
setLoading(true);
const res = await axios.get(`${API_BASE}/services`);
setServices(res.data);
setLoading(false);
} catch (err) {
console.error(err);
setLoading(false);
alert("Failed to fetch services");
}
};

useEffect(() => {
fetchServices();
}, []);

const resetForm = () => {
setServiceId(null);
setServiceName("");
setServiceDes("");
setServiceImage("");
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!serviceName.trim()) return alert("Please enter service name");
if (!serviceDes.trim()) return alert("Please enter service description");
if (!serviceImage) return alert("Please upload service image");


try {
  if (serviceId) {
    await axios.put(`${API_BASE}/services/${serviceId}`, {
      service_name: serviceName,
      service_des: serviceDes,
      service_image: serviceImage,
    });
    alert("Service updated successfully!");
  } else {
    await axios.post(`${API_BASE}/services`, {
      service_name: serviceName,
      service_des: serviceDes,
      service_image: serviceImage,
    });
    alert("Service added successfully!");
  }
  resetForm();
  fetchServices();
  const modalEl = document.getElementById('serviceModal');
  const modal = Modal.getInstance(modalEl);
  modal.hide();
} catch (err) {
  console.error(err);
  alert("Failed to save service");
}


};

const handleEdit = (service) => {
setServiceId(service.id);
setServiceName(service.service_name);
setServiceDes(service.service_des);
setServiceImage(service.service_image);
const modalEl = document.getElementById('serviceModal');
const modal = new Modal(modalEl);
modal.show();
};

const handleAddNew = () => {
resetForm();
const modalEl = document.getElementById('serviceModal');
const modal = new Modal(modalEl);
modal.show();
};

const handleDelete = async (id) => {
if (!window.confirm("Are you sure you want to delete this service?")) return;
try {
await axios.delete(`${API_BASE}/services/${id}`);
alert("Service deleted successfully!");
fetchServices();
} catch (err) {
console.error(err);
alert("Failed to delete service");
}
};

if (loading) return <div className="text-center my-5">Loading...</div>;

return ( <div className="container my-5"> <div className="d-flex justify-content-between align-items-center mb-4"> <h2>Services</h2> <button className="btn btn-success" onClick={handleAddNew}>Add New Service</button> </div>


  {services.length === 0 ? (
    <p>No services found.</p>
  ) : (
    <div className="table-responsive shadow-sm">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Service Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <img
                  src={service.service_image.startsWith("http") ? service.service_image : `${IMAGE_BASE}${service.service_image}`}
                  alt={service.service_name}
                  className="img-thumbnail"
                  style={{ width: "120px" }}
                />
              </td>
              <td>{service.service_name}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleEdit(service)}
                >
                  <FiEdit /> Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(service.id)}
                >
                  <FiTrash2 />Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Modal */}
  <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="serviceModalLabel">
            {serviceId ? "Edit Service" : "Add New Service"}
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form id="serviceForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Service Name:</label>
              <input
                type="text"
                className="form-control"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Service Description:</label>
              <JoditEditor
                ref={editor}
                value={serviceDes}
                onChange={(newContent) => setServiceDes(newContent)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Service Image:</label>
              <UploadImage
                source="Upload Service Image"
                onUpload={(url) => setServiceImage(url)}
              />
              {serviceImage && (
                <div className="mt-3">
                  <img
                    src={serviceImage.startsWith("http") ? serviceImage : `${IMAGE_BASE}/${serviceImage}`}
                    alt="preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="submit" form="serviceForm" className="btn btn-primary">
            {serviceId ? "Update Service" : "Add Service"}
          </button>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


);
}
