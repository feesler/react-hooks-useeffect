import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { API } from '../../api/index.js';
import Spinner from '../Spinner/Spinner.jsx';

function List(props) {
  const { onSelect } = props;
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await API.users.list();

      setLoading(false);
      if (usersList) {
        setUsers([...usersList]);
      }
    }

    setLoading(true);
    fetchUsers();
  }, []);

  const selectHandler = (e) => {
    e.preventDefault();

    const userId = Number(e.target.dataset.id);
    setActive(userId);

    if (onSelect) {
      const userInfo = users.find((user) => user.id === userId);
      onSelect(userInfo);
    }
  }

  return (
    <div className={classNames(['users-list', { 'loading': loading }])}>
      <Spinner />
      <div className="list-group" onClick={selectHandler}>
        {users.map((user) =>
          <a
            key={user.id}
            className={classNames([
              'list-group-item',
              { 'active': user.id === active }
            ])}
            data-id={user.id}
          >
            {user.name}
          </a>
        )}
      </div>
    </div>
  )
}

List.propTypes = {
  onSelect: PropTypes.func,
};

List.defaultProps = {
  onSelect: null,
};

export default List;
