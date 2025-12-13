// import { FiChevronRight } from "react-icons/fi";

import GetAQuote from "./GetAQuote"



export default function HomeCoverContent() {
  return (
    

    <>
    <div className="container">


    <div className='cover_wrapper'>

                <div className='p_ti'>Professional</div>
                <div className='t_ti hide_mobile'>Telecommunication Tower </div>
                 <div className='t_ti hide_desktop'>Civil Tower </div>
                <div className='i_ti'>Installation and Maintenance</div>
               
                <div className='mt-4'>
                    {/* <button className='btn btn_quote'>Get a Quote <FiChevronRight /></button> */}
                    <GetAQuote/>
                </div>
          
            </div>
    </div>
    
    </>
  )
}
