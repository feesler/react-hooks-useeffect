import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { API } from '../../api/index.js';
import Spinner from '../Spinner/Spinner.jsx';
import UserCard from './UserCard.jsx';

function Details(props) {
  const { info } = props;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      const userDetails = await API.users.read(userId);
      setLoading(false);
      if (userDetails) {
        setUser({ ...userDetails });
      }
    }

    if (
      !info
      || (user && info.id === user.id)
    ) {
      return;
    }

    setLoading(true);
    setUser(null);
    fetchUserDetails(info.id);
  }, [info]);

  const blockClasses = classNames(['details-block', { 'loading': loading }]);

  return (
    <div className={blockClasses}>
      <Spinner />
      <UserCard user={user} />
    </div>
  )
}

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

Details.defaultProps = {
  info: null,
};

export default Details;
