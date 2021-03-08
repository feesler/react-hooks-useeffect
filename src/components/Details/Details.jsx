import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { API } from '../../api/index.js';
import Spinner from '../Spinner/Spinner.jsx';
import UserCard from '../UserCard/UserCard.jsx';

const errorMessage = 'Failed to load user details. Please check your network connection and try again later.';

function Details(props) {
  const { info } = props;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      setLoading(true);
      setUser(null);
      setError(false);

      const userDetails = await API.users.read(userId);

      setLoading(false);
      if (userDetails) {
        setUser({ ...userDetails });
      } else {
        setError(true);
      }
    }

    if (
      !info
      || (user && info.id === user.id)
    ) {
      return;
    }

    fetchUserDetails(info.id);
  }, [info]);

  const blockClasses = classNames([
    'details-block',
    { 'loading': loading },
    { 'error': error },
  ]);

  return (
    <div className={blockClasses}>
      <Spinner />
      <div className="error-message">{errorMessage}</div>
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
