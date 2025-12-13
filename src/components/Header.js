import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronDown, FiMail, FiPhone, FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Logo from "../assets/logo.png"; 
import Logodark from "../assets/logo-dark.png";

export default function Header({ variant = "main" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Determine classes based on variant
  const headerClass = variant === "main" ? "main_header" : "main_header inner_page_header";
  const logoImg = variant === "main" ? Logo : Logodark;

  return (
    <header className={headerClass}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img className="logo" src={logoImg} alt="Sai Enterprises" />
          </Link>

          {/* Hamburger menu for mobile */}
          <button className="mobile_btn" onClick={() => setIsOpen(true)}>
            <BsList />
          </button>

          {/* Desktop Navbar */}
          <div className="collapse navbar-collapse hide_mobile" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>

              <li className="nav-item dropdown">
                <div className="hoverMenu">
                  <Link className="nav-link hoverItem" to="/services">
                    Services <FiChevronDown />
                  </Link>
                  <div className="hoverContent">
                    <ul className="animate slideIn">
                      <li><Link className="mItem" to="/services#civil-tower">Civil & Tower</Link></li>
                      <li><Link className="mItem" to="/services#electrical-work">Electrical Work</Link></li>
                      <li><Link className="mItem" to="/services#active-work">Active Work</Link></li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>

              {/* Auth Links */}
              {isLoggedIn && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                  <li style={{paddingTop:'9px'}} className="nav-item">
                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Overlay for mobile sidebar */}
          {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

          {/* Mobile Sidebar */}
          <div className={`mobile_sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar_inner">
              <button className="close_btn" onClick={closeSidebar}><IoCloseOutline /></button>
              <div className="sidebar_logo"><img src={Logodark} alt="Sai Enterprises" /></div>

              <ul className="sidebar_menu">
                <li><Link onClick={closeSidebar} to="/">Home</Link></li>
                <li><Link onClick={closeSidebar} to="/about">About Us</Link></li>
                <li><Link onClick={closeSidebar} to="/services">Services</Link></li>
                <li><Link onClick={closeSidebar} to="/projects">Projects</Link></li>
                <li><Link onClick={closeSidebar} to="/contact">Contact Us</Link></li>

                {isLoggedIn && (
                  <>
                    <li><Link onClick={closeSidebar} to="/dashboard">Dashboard</Link></li>
                    <li>
                      <button className="btn btn-danger btn-sm w-100" onClick={() => { handleLogout(); closeSidebar(); }}>Logout</button>
                    </li>
                  </>
                )}
              </ul>

              {/* Contact & Social */}
              <div className="mb-2"><FiMail /> afroz@saienterprisesco.in</div>
              <div className="mb-2"><FiPhone /> +91 7054922228</div>
              <div className="sidebar_social">
                <Link to=""><FiFacebook /></Link>
                <Link to=""><FiLinkedin /></Link>
                <Link to=""><FiInstagram /></Link>
                <Link to=""><FiYoutube /></Link>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}
