import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as UserIcon } from '../../assets/user-icon.svg';

function UserCard(props) {
  const { user } = props;
  const [imageLoading, setImageLoading] = useState(true);

  const onImageLoad = () => {
    setImageLoading(false);
  }

  useEffect(() => {
    if (user) {
      setImageLoading(true);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="card">
      <div className={classNames(['card-img-top', { 'img-loading': imageLoading }])}>
        <div className="img-placeholder">
          <UserIcon />
        </div>
        <img
          src={user.avatar}
          alt={user.name}
          onLoad={onImageLoad}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">City: {user.details.city}</li>
        <li className="list-group-item">Company: {user.details.company}</li>
        <li className="list-group-item">Position: {user.details.position}</li>
      </ul>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.shape({
      city: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    }).isRequired
  }),
};

export default UserCard;
