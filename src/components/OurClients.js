import client1 from '../assets/images/clients/g.gif';
import client2 from '../assets/images/clients/b.gif';
import client3 from '../assets/images/clients/c.gif';
import client4 from '../assets/images/clients/d.gif';
import client5 from '../assets/images/clients/e.gif';
import client6 from '../assets/images/clients/f.gif';
import client7 from '../assets/images/clients/a.gif';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';



const OurClients = () => {

  
    return (

<>

<div className='container mt-5 mb-5'>

<h3 className="text-center mb-4">Our Clients</h3>


<div className='row'>


<div className='col-12 text-center'>


      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
        style={{paddingBottom:"20px"}}
      >
      
        <SwiperSlide> <div><img className='img-fluid' src={client2} alt='client'></img></div> </SwiperSlide>
        <SwiperSlide> <div><img className='img-fluid' src={client3} alt='client'></img></div> </SwiperSlide>
        <SwiperSlide> <div><img className='img-fluid' src={client4} alt='client'></img></div> </SwiperSlide>
        <SwiperSlide> <div><img className='img-fluid' src={client5} alt='client'></img></div> </SwiperSlide>
        <SwiperSlide> <div><img className='img-fluid' src={client6} alt='client'></img></div> </SwiperSlide>   
        <SwiperSlide> <div><img className='img-fluid' src={client7} alt='client'></img></div> </SwiperSlide>
        <SwiperSlide> <div><img className='img-fluid' src={client1} alt='client'></img></div> </SwiperSlide>
      </Swiper>


      </div>



</div>

</div>

</>




  )
}


export default OurClients;