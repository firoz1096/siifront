import MainLayout from '../components/MainLayout'
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from "react";
import { FiMapPin, FiMail, FiPhone   } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import axios from "axios";
import CustomInputField from "../components/controls/CustomInputField";
import Spinner from "../components/Spinner";
import { RiSendPlaneFill } from "react-icons/ri";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function ContactUs() {

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false); // <-- new state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid (must be 10–15 digits)";
    }

    // Email validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoadingSubmit(true); // <-- set loading when submitting

    try {
      const response = await axios.post(
        `${API_BASE}/contact-enquiry`,
        formData
      );

      if (response.status === 201 || response.status === 200) {
        setSuccessMsg("Thank you for contacting us! We will get back to you soon.");

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        // Clear success message after 9 seconds
        setTimeout(() => setSuccessMsg(""), 9000);
      }

    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Something went wrong while submitting your enquiry. Please try again.");
    } finally {
      setLoadingSubmit(false); // <-- stop loading
    }
  };

  const handleWhatsAppQuote = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const message = `Contact Us Enquiry:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/contact-info`);
        setContactInfo(res.data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="SAI ENTERPRISES is one of the fastest-growing multidisciplinary turnkey consultancy and construction management organizations in India." />
      </Helmet>

      <MainLayout>
        <Breadcrumb title="Contact Us" subTitle="Get in Touch" />

        <div className='container py-5 page_section'>
          <div className="row">

            <div className="col-lg-6 mb-4">
              <h1 className='mb-4'>Get in Touch with us</h1>
              <div className="row">
                {loading ? (
                  <Spinner />
                ) : contactInfo ? (
                  <>
                    {/* Address */}
                    <div className="col-12 mb-5">
                      <div className="d-flex align-items-center">
                        <span className="me-3 rounded p-3 bg-secondary">
                          <FiMapPin className="text-white fs-4" />
                        </span>
                        <div>
                          <h5>Location Address</h5>
                          <p className="m-0">{contactInfo.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12 mb-5">
                      <div className="d-flex align-items-center">
                        <span className="me-3 rounded p-3 bg-secondary">
                          <FiMail className="text-white fs-4" />
                        </span>
                        <div>
                          <h5>Email Address</h5>
                          <p className="m-0">{contactInfo.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-12 mb-5">
                      <div className="d-flex align-items-center">
                        <span className="me-3 rounded p-3 bg-secondary">
                          <FiPhone className="text-white fs-4" />
                        </span>
                        <div>
                          <h5>Phone Number</h5>
                          <p className="m-0">{contactInfo.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <span className="me-3 rounded p-3 bg-secondary">
                          <FaRegBuilding className="text-white fs-4" />
                        </span>
                        <div>
                          <h5>Walk-Ins Welcome</h5>
                          <p className="m-0">{contactInfo.workinghours}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-danger">Failed to load contact info.</p>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <h1 className='mb-4'>Reach Out for Information</h1>
              {successMsg && (
                <div className="alert alert-success">
                  {successMsg}
                </div>
              )}

              <form className='row' onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <CustomInputField
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                />

                {/* Phone */}
                <CustomInputField
                  label="Phone"
                  type="number"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                  colClass="col-md-6 mt-3"
                />

                {/* Email */}
                <CustomInputField 
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                  colClass="col-md-6 mt-3"
                />

                {/* Message */}
                <div className="col-12 mt-3 mb-4">
                  <label className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex gap-3">
                  <button type="submit" className="btn btn-lg btn-primary" disabled={loadingSubmit}>
                    <RiSendPlaneFill /> {loadingSubmit ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-success"
                    onClick={handleWhatsAppQuote}
                  >
                    <BsWhatsapp /> WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "400px" }}>
          {loading ? (
            <Spinner />
          ) : contactInfo ? (
            <iframe
              title="office-map"
              src={contactInfo.mapembedurl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <p className="text-danger">Failed to load map.</p>
          )}
        </div>

      </MainLayout>
    </>
  )
}
