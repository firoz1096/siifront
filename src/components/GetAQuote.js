import { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";


const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function GetQuoteForm() {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    captcha: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const services = ["Civil & Tower", "Electrical Work", "Active Work"];

  // --- Generate simple math captcha
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);

  useEffect(() => generateCaptcha(), []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`${a} + ${b} = ?`);
    setCaptchaAnswer(a + b);
    setFormData((prev) => ({ ...prev, captcha: "" }));
  };

  // Validation
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim() && name !== "message") error = "This field is required";

    if (name === "email" && value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) error = "Enter a valid email";
    }

    if (name === "phone" && value.trim()) {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(value)) error = "Phone must be 10 digits";
    }

    if (name === "captcha") {
      if (parseInt(value) !== captchaAnswer) error = "Captcha is incorrect";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) newErrors[field] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      const response = await fetch(`${API_BASE}/get-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Your quote request has been submitted! A confirmation email has been sent to your inbox.");
        setFormData({ name: "", email: "", phone: "", service: "", message: "", captcha: "" });
        generateCaptcha();
        setErrors({});
        setTimeout(() => handleClose(), 1000);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      alert("Failed to send request!");
      console.error(err);
    }

    setLoading(false);
  };

  const handleClose = () => setIsClosing(true);
  const handleAnimationEnd = () => isClosing && (setShowModal(false), setIsClosing(false));

  return (
    <>
      <button className="btn btn_quote" onClick={() => setShowModal(true)}>
        Get a Quote <FiChevronRight />
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div
            className={`modal-dialog modal-lg modal-dialog-centered animate__animated ${
              isClosing ? "animate__slideOutUp animate__faster" : "animate__slideInDown animate__faster"
            }`}
            onAnimationEnd={handleAnimationEnd}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title f-bold">Need to Make an Enquiry?</h2>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>

              <div className="modal-body">
                {successMsg && (
                  <div className="alert alert-success text-center py-2">{successMsg}</div>
                )}

                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Name */}
                  <div className="col-lg-6 mb-2">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Email */}
                    <div className="col-lg-6 mb-2">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Phone */}
                   <div className="col-lg-6 mb-2">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Service */}
                    <div className="col-lg-6 mb-2">
                    <label className="form-label">Select Service</label>
                    <select
                      className={`form-select ${errors.service ? "is-invalid" : ""}`}
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Choose a service</option>
                      {services.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <div className="invalid-feedback">{errors.service}</div>}
                  </div>

                  {/* Message */}
                  <div className="col-12 mb-2">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  
                  <div className="col-12">
                <div className="row align-items-center">
                {/* Simple Math Captcha */}
                <div className="col-lg-6 mb-2">
                <label className="form-label">Captcha: {captchaQuestion}</label>
                <input
                type="text"
                className={`form-control ${errors.captcha ? "is-invalid" : ""}`}
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                />
                {errors.captcha && <div className="invalid-feedback">{errors.captcha}</div>}
                </div>

                <div className="col-lg-6 mb-2 text-end">
                <button type="submit" className="btn btn-lg btn-primary px-3" disabled={loading}>
                <RiSendPlaneFill /> {loading ? "Sending..." : "Send Message"}
                </button>

                </div>
                </div>

                  </div>

         
                </form>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
