import twork from '../assets/images/img/tower-maintenance-activity.jpg';
import ework from '../assets/images/img/electrical-works.jpg';
import { FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router';

export default function ProjectHome() {
  return (
        <>
    <div className='services_section project_section'>


    <div className='container'>


<div className="heading_style text-center pb-4">
  <h6>our work</h6>
  <h1>Completed Projects</h1>

</div>

    <div className='row align-items-center'>


<div className="col-lg-6 mb-4">


<div className='position-relative'>
      <img src={twork} alt='project' 
    className='img-fluid'/>
    <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 py-2 text-white text-center">
    <h4 className='m-0'>Tower Maintenance Activity</h4>
  </div>
</div>



</div>

<div className="col-lg-6 mb-4">

<div className='position-relative'> 
    <img src={ework} alt='project' 
    className='img-fluid'/>

<div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 py-2 text-white text-center">
    <h4 className='m-0'>Electrical Works</h4>
  </div>

</div>


</div>



<div className="col-12 text-center mt-3">

    <Link className='btn btn-lg btn-primary' to="/projects">View All <FiChevronRight /></Link>
</div>

    </div>
    </div>

  </div>
    
    </>

  )
}
