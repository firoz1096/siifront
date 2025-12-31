import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import Home from './App';
//pages
import AboutUs from './pages/AboutUs';
import OurServices from './pages/OurServices';
import ScrollToHash from "./components/ScrollToHash"; //for hash links mannualy
import Projects from './pages/Projects';
import ContactUs from './pages/ContactUs';
import EditAboutUs from './dashboard/EditAboutUs';
import PostProject from './dashboard/PostProject';
import ProjectsCRUD from './dashboard/ProjectsCRUD';
// import PostServices from './dashboard/PostServices';
import ServicesCRUD from './dashboard/ServicesCRUD';
//auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import PageNotFound from "./pages/PageNotFound";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HelmetProvider>  
  <React.StrictMode>
      <BrowserRouter>
   <ScrollToHash />
      <Routes> 
        {/* public pages */}
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/services" element={<OurServices/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/contact" element={<ContactUs/>} />        
        <Route path="/login" element={<Login />} />
     
      
       {/*Protected pages */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
          <Route 
          path="/post-project" 
          element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          } 
        />

          <Route 
          path="/edit-about" 
          element={
            <ProtectedRoute>
              <EditAboutUs />
            </ProtectedRoute>
          } 
        />


          <Route 
          path="/crud-project" 
          element={
            <ProtectedRoute>
              <ProjectsCRUD />
            </ProtectedRoute>
          } 
        />




        {/* <Route 
          path="/post-services" 
          element={
            <ProtectedRoute>
              <PostServices />
            </ProtectedRoute>
          } 
        /> */}


        <Route 
          path="/crud-services" 
          element={
            <ProtectedRoute>
              <ServicesCRUD />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/register" 
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          } 
        />



      
      <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
</HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
