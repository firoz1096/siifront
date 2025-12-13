import CivilTower from "../assets/images/pngicons/civil-tower.png"; 
import ElectricWork from "../assets/images/pngicons/electric-work.png"; 
import ActiveWork from "../assets/images/pngicons/active-work.png"; 

export default function ServicesHome() {
  return (
    <>
    <div className='services_section bg-light'>


    <div className='container'>


<div className="heading_style text-center mb-4">
  <h6>What we do</h6>
  <h1>Our Services</h1>

</div>

    <div className='row row-cols-1 row-cols-md-3 g-4 d-flex align-items-stretch'>


<div className="col text-center">
 <div className="se_block h-100">
  <div><img src={CivilTower} alt="Civil & Tower" /></div>
  <h2>Civil & Tower</h2>
  <p>We provide complete civil and tower services, including maintenance, strengthening, erection, dismantling, and TSP activities.</p>
</div>



</div>

<div className="col text-center">
   <div className="se_block h-100">

    <div> <img src={ElectricWork} alt="Electrical Work" /> </div>
    <div><h2>Electrical  Work</h2></div>
    <div><p>We deliver comprehensive electrical services, including maintenance, upgrades, SPS and BTS installation, link connectivity and dismantling, and other related works.</p></div>

   </div>
</div>


<div className="col text-center">
<div className="se_block h-100">

    <div> <img src={ActiveWork} alt="Active Work" /> </div>
    <div><h2>Active Work</h2></div>
    <div><p>We offer a full range of active network solutions, including ODSC, IDSC, IVS, Wi-Fi deployment, ILL services, and sector edition implementations.</p></div>

   </div>
</div>


    </div>
    </div>
    </div>
    
    </>


  )
}
