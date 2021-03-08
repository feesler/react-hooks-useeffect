import React, { useState, useEffect } from 'react';
import List from './components/List/List.jsx';
import Details from './components/Details/Details.jsx';
import { API } from './api/index.js';
import './App.css';

const errorMessage = 'Failed to load data. Please check your network connection and try again later.';

function App() {
  const [info, setInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [listLoading, setListLoading] = useState(false);

  const handleSelect = (userId) => {
    const userInfo = users.find((user) => user.id === userId);
    if (userInfo) {
      setInfo({ ...userInfo });
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      setListLoading(true);

      const usersList = await API.users.list();
      if (usersList) {
        setUsers([...usersList]);
      } else {
        setError(errorMessage);
      }

      setListLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <List items={users} loading={listLoading} error={error} onSelect={handleSelect} />
      <Details info={info} />
    </div>
  );
}

export default App;
