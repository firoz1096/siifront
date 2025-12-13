
import { Link } from "react-router";
// import aboutus from "../assets/images/backgrounds/who-we-are.jpg";

function Breadcrumb({title, subTitle}) {
  return (
    <>
    
           <div className='breadcrumb_area'>
          <div style={{height:'150px'}} className='photo'>
            
            <div className='wrapper'>
              <div className='container'>
                <h1 className='breadcrumb_title'>{title}</h1>
                <ul className="breadcrumb_list">
                  <li className="breadcrumb_item"><Link to='/'>Home</Link></li>
                  <li className="breadcrumb_item">{subTitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    
    </>
  )
}

export default Breadcrumb