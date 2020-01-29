import React from 'react';
import PropTypes from 'prop-types';

import { Entry } from '../Utils';

const EntryList = ({ entries, onDelete }) => (
    <div className="container-fluid">
        <ul className="list-group">
            {entries.map(item => (
                <li className="list-group-item clearfix" key={item.getUuid()}>
                    <a href={`${item.getAuthUrl()}/${item.getUserId()}`} target="_blank">
                        {item.getUserName()} ({item.getUserId()})
                    </a>
                    <span className="float-right">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => { navigator.clipboard.writeText(item.getUserId()) }}
                        >
                            Copy User Id
                        </button>
                        {' '}
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(item.getUuid())}
                        >
                            Delete
                        </button>
                    </span>
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
