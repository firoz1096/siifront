import AboutUs from "../assets/images/about-us.jpg"; // adjust your path
import { FiChevronRight } from "react-icons/fi";

import { Link } from "react-router-dom";

export default function AboutHome() {
  return (
    


    <>
    <div className="about_section">
   
    <div className="container">

<div className="row align-items-center">

<div className="col-lg-6">
 <div className="heading_style">
<h6>who we are</h6>
<h1>About Us</h1>
 </div>
  
  <div>
      <p>
        At <b>SAI ENTERPRISES</b>, we are dedicated to building a connected world by delivering reliable, high-quality infrastructure and technical solutions. Since our inception, we have consistently focused on providing services that empower seamless communication, robust electrical systems, and efficient network solutions for a wide range of clients.
     
    </p>
    <p>With a strong foundation in telecommunications, electrical works, and active network services, we pride ourselves on offering end-to-end solutions that are tailored to meet the unique requirements of each project.</p>
  </div>
  
  <div className='pt-3'>
                      <Link className='btn btn-primary' to="/about">Read More <FiChevronRight /></Link>
                  </div>

</div>

<div className="col-lg-5 offset-md-1 text-md-end hide_mobile">
    <img className="img-fluid" src={AboutUs} alt="" />
</div>

</div>

    </div>

</div>    
    </>
  )
}
