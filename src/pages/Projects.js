import MainLayout from '../components/MainLayout'
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import MasonryGallery from '../components/MasonryGallery';



export default function Projects() {
  return (
   
   
    <>

<Helmet>
<title>Projects</title>
<meta name="description" content="Tower Maintenance Activity, Electrical Work, Active Work" />
</Helmet>


    <MainLayout>
<Breadcrumb title="Projects" subTitle="Our Work" />



        <div className='container py-5 page_section'>

        <div className='row align-items-center'>
  
   

<div className="col-12">
  <h1>Completed Projects</h1>
  <p>Browse our Completed Projects that highlight the passion and expertise we bring to every task. At Our Work, we focus on delivering high-quality results that meet and exceed expectations. Each project tells the story of commitment, precision, and innovation.</p>
</div>
<div className="col-12 mt-3">
<MasonryGallery />
  </div>
        </div>

        </div> 

        
   </MainLayout>

   </>


  )
}
