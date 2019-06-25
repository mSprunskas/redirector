import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import { Entry } from '../Utils';

class Form extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userName: '',
            authUrl: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    }

    submit(event) {
        event.preventDefault();

        const { onUpdate } = this.props;
        const { userId, userName, authUrl } = this.state;
        const { defaultUrl } = this.props;

        const url = authUrl === '' ? defaultUrl : authUrl;

        const entry = new Entry();
        // TODO: check for id collisions
        entry.setUuid(uuidv4());
        entry.setUserId(userId);
        entry.setUserName(userName);
        entry.setAuthUrl(url);

        onUpdate(entry);
    }

    render() {
        const { userId, userName, authUrl } = this.state;
        const { defaultUrl } = this.props;

        return (
            <form onSubmit={this.submit}>
                <div className="form-group">
                    <label>User Id</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userId"
                        value={userId}
                        placeholder="007"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={userName}
                        placeholder="John Doe"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Auth URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="authUrl"
                        value={authUrl}
                        onChange={this.handleChange}
                    />
                    <small className="form-text text-muted">
                        {`default: ${defaultUrl}`}
                    </small>
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-primary pull-left"
                    >
                        Add
                    </button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    defaultUrl: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default Form;
