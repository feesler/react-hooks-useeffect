import React, { useState, useEffect } from 'react';
import List from './components/List/List.jsx';
import Details from './components/Details/Details.jsx';
import { API } from './api/index.js';
import './App.css';

function App() {
  const [info, setInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const handleSelect = (userId) => {
    const userInfo = users.find((user) => user.id === userId);
    if (userInfo) {
      setInfo({ ...userInfo });
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setListLoading(true);

      const usersList = await API.users.list();

      if (usersList) {
        setUsers([...usersList]);
      }
      setListLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <List items={users} loading={listLoading} onSelect={handleSelect} />
      <Details info={info} />
    </div>
  );
}

export default App;
