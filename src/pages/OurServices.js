import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';



const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function OurServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE}/services`);
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services</title>
        <meta name="description" content="SAI ENTERPRISES is one of the fastest-growing multidisciplinary turnkey consultancy and construction management organizations in India." />
      </Helmet>

      <MainLayout>
       <Breadcrumb title="Services" subTitle="What We Do" />
    

        {/* Services Section */}
        <div className='container py-5 page_section page_services_section'>
          {loading ? (
            <p>Loading services...</p>
          ) : services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            services.map((service, index) => (
              <div
                className='row align-items-md-center py-md-4 service-item fade-in'
                key={service.id}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className='col-lg-6'>
                      <h1>{service.service_name}</h1>
                      <div dangerouslySetInnerHTML={{ __html: service.service_des }} />
                    </div>
                    <div className='col-lg-6'>
                      <img id={service.menu_id} 
                        src={service.service_image.startsWith('http') ? service.service_image : `${IMAGE_BASE}${service.service_image}`}
                        alt={service.service_name}
                        className='img-fluid rounded mb-3 mb-md-0'
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='col-lg-6'>
                      <img id={service.menu_id} 
                        src={service.service_image.startsWith('http') ? service.service_image : `${IMAGE_BASE}${service.service_image}`}
                        alt={service.service_name}
                        className='img-fluid rounded'
                      />
                    </div>
                    <div className='col-lg-6'>
                      <h1>{service.service_name}</h1>
                      <div dangerouslySetInnerHTML={{ __html: service.service_des }} />
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </MainLayout>
    </>
  );
}
