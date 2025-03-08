import React from 'react';
import Landingpage from './components/landing_page';
import Homepage from './pages/User/Homepage';

function App() {
  // Check if the token is in localStorage
  const token = localStorage.getItem('token');

  return (
    <div>
      {token ? <Homepage /> : <Landingpage />}
    </div>
  );
}

export default App;
