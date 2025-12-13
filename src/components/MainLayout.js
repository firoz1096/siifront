import React from 'react';
import Layout from './Layout';
import GoToTop from './GoToTop';
import InnerHeader from './InnerHeader';
import InnerTopHeader from './InnerTopHeader';



export default function MainLayout({ children }) {
  return (
<React.Fragment>
    <Layout>
      <InnerTopHeader />
      <InnerHeader />
      {children}
      <GoToTop/>
    </Layout>
  </React.Fragment>
  )
}
