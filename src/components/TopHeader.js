import { FiMail, FiClock, FiPhone, FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import useContactInfo from "../hooks/useContactInfo";

export default function TopHeader() {

  const { contactInfo, loading } = useContactInfo();

  return (
    <div className="mini_header hide_mobile">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Section */}
          <div className="col-md-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span className="me-2">
                  <FiMail /> {contactInfo.email}
                </span>

                <span className="ms-3 me-3">|</span>

                <span className="me-2">
                  <FiClock /> Working: {contactInfo.workinghours}
                </span>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="col-md-6 text-md-end">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span className="me-2">
                  <FiPhone /> {contactInfo.phone}
                </span>

                <span className="ms-3 me-3">|</span>

                <Link className="text-white me-2" to={contactInfo.facebookurl} target="_blank">
                  <FiFacebook />
                </Link>

                <Link className="text-white me-2" to={contactInfo.linkedinurl} target="_blank">
                  <FiLinkedin />
                </Link>

                <Link className="text-white me-2" to={contactInfo.instagramurl} target="_blank">
                  <FiInstagram />
                </Link>

                <Link className="text-white me-2" to={contactInfo.youtubeurl} target="_blank">
                  <FiYoutube />
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
