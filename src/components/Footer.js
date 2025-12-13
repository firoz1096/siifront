import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiMapPin } from "react-icons/fi";
import Spinner from "./Spinner";
import useContactInfo from "../hooks/useContactInfo";

export default function Footer() {

  const { contactInfo, loading } = useContactInfo();

  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><Link className="text-light text-decoration-none" to="/">Home</Link></li>
              <li className="mb-2"><Link className="text-light text-decoration-none" to="/about">About Us</Link></li>
              <li className="mb-2"><Link className="text-light text-decoration-none" to="/services">Services</Link></li>
              <li className="mb-2"><Link className="text-light text-decoration-none" to="/projects">Projects</Link></li>
              <li className="mb-2"><Link className="text-light text-decoration-none" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Opening Hours</h5>

            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="row align-items-center mb-3">
                  <div className="col-md-12">Week Days: {contactInfo.workinghours}</div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-md-12">Saturday: 9.00am - 3.00pm</div>
                </div>

                <div className="row align-items-center">
                  <div className="col-md-12">Sunday: Day Off</div>
                </div>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contact</h5>

            {loading ? (
              <Spinner />
            ) : (
              <>
                <p><FiPhone /> {contactInfo.phone}</p>
                <p><FiMail /> {contactInfo.email}</p>

                <div className="d-flex">
                  <div className="me-1"><FiMapPin /></div>
                  <div><p>{contactInfo.address}</p></div>
                </div>

                <div className="d-flex gap-3">
                  <Link className="text-white" to={contactInfo.facebookurl} target="_blank"><FiFacebook /></Link>
                  <Link className="text-white" to={contactInfo.linkedinurl} target="_blank"><FiLinkedin /></Link>
                  <Link className="text-white" to={contactInfo.instagramurl} target="_blank"><FiInstagram /></Link>
                  <Link className="text-white" to={contactInfo.youtubeurl} target="_blank"><FiYoutube /></Link>
                </div>
              </>
            )}

          </div>

        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Sai Enterprises. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
