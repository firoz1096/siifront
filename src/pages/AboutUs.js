import MainLayout from '../components/MainLayout'
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function AboutUs() {

const [aboutData, setAboutData] = useState({ description: '', image: '' });
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${API_BASE}/about-info`);
        setAboutData(res.data);
      } catch (err) {
        console.error('Error fetching About info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-5 text-center">
          <Spinner />
        </div>
      </MainLayout>
    );
  }




  return (
   
   
    <>

<Helmet>
<title>About US</title>
<meta name="description" content="At Sai Enterprises, we are dedicated to building a connected world by delivering reliable, high-quality infrastructure and technical solutions." />
</Helmet>


    <MainLayout>
 <Breadcrumb title="About Us" subTitle="Who We Are" />



        <div className='container py-5 page_section page_about_section'>

        <div className='row align-items-center'>
  
   

<div className="col-12">
  <h1>Who We Are</h1>  
 {aboutData.image && (
                <img
                  src={`${IMAGE_BASE}${aboutData.image}`}
                  alt="About Us"
                  className="img-fluid rounded float-end mb-3 mb-md-0"
                />
              )}

<div
                dangerouslySetInnerHTML={{ __html: aboutData.description }}
              />
</div>

        </div>

        </div> 

        
   </MainLayout>

   </>


  )
}
