import React from 'react';
import WelcomeSection from './WelcomeSection';
import ServiceStatistics from './ServiceStatistics';

// Example user object
const user = {
  givenname: "Thomas",
  // other user properties...
};

const HomePage: React.FC = () => {
  // Example services data
  const services = [
    // Your services data here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Using the new WelcomeSection component */}
      <WelcomeSection user={user} />
      
      {/* The rest of your page content */}
      <ServiceStatistics services={services} />
      
      {/* Other components... */}
    </div>
  );
};

export default HomePage;