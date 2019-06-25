import React from 'react';
import PropTypes from 'prop-types';

import { Entry } from '../Utils';

const EntryList = ({ entries, onDelete }) => (
    <div className="container-fluid">
        <ul className="list-group">
            {entries.map(item => (
                <li className="list-group-item clearfix" key={item.getUuid()}>
                    <a href={`${item.getAuthUrl()}/${item.getUserId()}`} target="_blank" className="btn btn-link">
                        {item.getUserName()} ({item.getUserId()})
                    </a>
                    <button type="button" className="btn btn-danger float-right" onClick={() => onDelete(item.getUuid())}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

EntryList.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.instanceOf(Entry)).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EntryList;
