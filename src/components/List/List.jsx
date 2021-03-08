import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner.jsx';

function List(props) {
  const { items, loading, error, onSelect } = props;
  const [active, setActive] = useState(null);

  const selectHandler = (e) => {
    e.preventDefault();

    const itemId = Number(e.target.dataset.id);
    setActive(itemId);

    if (onSelect) {
      onSelect(itemId);
    }
  }

  const blockClasses = classNames([
    'list-container',
    { 'loading': loading },
    { 'error': error !== null },
  ]);

  return (
    <div className={blockClasses}>
      <Spinner />
      <div className="error-message">{error}</div>
      <div className="list-group" onClick={selectHandler}>
        {items.map((item) =>
          <a
            key={item.id}
            className={classNames(['list-group-item', { 'active': item.id === active }])}
            data-id={item.id}
          >
            {item.name}
          </a>
        )}
      </div>
    </div>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onSelect: PropTypes.func,
};

List.defaultProps = {
  items: [],
  loading: false,
  error: null,
  onSelect: null,
};

export default List;
