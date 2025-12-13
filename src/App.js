import '../src/custom.scss';
import AboutHome from './components/AboutHome';
import Footer from './components/Footer';
import HomeCoverContent from './components/HomeCoverContent';
import MainHeader from './components/MainHeader';
import OurClients from './components/OurClients';
import ProjectHome from './components/ProjectHome';
import ServicesHome from './components/ServicesHome';
import StatsSection from './components/StatsSection';
import StrenghthHome from './components/StrenghthHome';
import TopHeader from './components/TopHeader';
import { Helmet } from 'react-helmet-async';


function App() {
  return (
    <div className="App">
<>

<Helmet>
<title>Sai Enterprises</title>
<meta name="description" content="We provide telecommunication tower installation, maintenance, electrical services, and comprehensive infrastructure solutions." />
</Helmet>


<div className='bg_home_section'>

<TopHeader/>
<MainHeader/>
<HomeCoverContent />

</div>
<AboutHome />

<ServicesHome />
<StrenghthHome />
<ProjectHome />
<StatsSection />
<OurClients />
<Footer />

  </>


    </div>
  );
}

export default App;
