import Quality from "../assets/images/pngicons/quality.png"; 
import Safety from "../assets/images/pngicons/safety.png"; 
import Professional from "../assets/images/pngicons/professionals.png"; 

export default function StrenghthHome() {
  return (
    
    <>
    <div className='services_section'>


    <div className='container'>


<div className="heading_style text-center mb-4">
  <h6>What we have</h6>
  <h1>Our Strengths</h1>

</div>

<div className='row row-cols-1 row-cols-md-3 g-4 d-flex align-items-stretch'>


<div className="col text-center">
   <div className="se_block h-100">

    <div> <img src={Quality} alt="Quality" /> </div>
    <div><h2>Quality</h2></div>
    <div><p>We deliver the highest standards in telecom services, supported by a dedicated internal quality audit team.</p></div>

   </div>
</div>

   <div className="col text-center">
   <div className="se_block h-100">

    <div> <img src={Safety} alt="Safety" /> </div>
    <div><h2>Safety</h2></div>
    <div><p>Our execution teams follow strict safety guidelines and are fully equipped with standard safety tools.</p></div>

   </div>
</div>


   <div className="col text-center">
   <div className="se_block h-100">

    <div> <img src={Professional} alt="Professionals" /> </div>
    <div><h2>Professionals</h2></div>
    <div><p>We have experienced professionals with 5+ years of expertise across leading multinational companies.</p></div>

   </div>
</div>


    </div>
    </div>
    </div>
    
    </>
  )
}
