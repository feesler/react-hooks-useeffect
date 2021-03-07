import React, { useState, useEffect } from 'react';
import List from './components/List/List.jsx';
import Details from './components/Details/Details.jsx';
import './App.css';

function App() {
  const [info, setInfo] = useState(null);

  const onUserSelect = (userInfo) => {
    setInfo({ ...userInfo });
  }

  return (
    <div className="App">
      <List onSelect={onUserSelect} />
      <Details info={info} />
    </div>
  );
}

export default App;
