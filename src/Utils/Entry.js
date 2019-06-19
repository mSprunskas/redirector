class Entry {
    constructor() {
        this.uuid = null;
        this.userName = '';
        this.userId = '';
        this.authUrl = ''
    }

    /**
     * @param {string} uuid
     */
    setUuid(uuid) {
        this.uuid = uuid;
    }

    /**
     * @return {string|null}
     */
    getUuid() {
        return this.uuid;
    }

    /**
     * @param {string} username
     */
    setUserName(username) {
        this.userName = username;
    }

    /**
     * @returns {string}
     */
    getUserName() {
        return this.userName;
    }

    /**
     * @param {string} userId
     */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
     * @returns {string|null}
     */
    getUserId() {
        return this.userId;
    }

    /**
     * @param {string} authUrl
     */
    setAuthUrl(authUrl) {
        this.authUrl = authUrl;
    }

    /**
     * @returns {string}
     */
    getAuthUrl() {
        return this.authUrl;
    }
}

export default Entry;
