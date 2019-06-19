import ls from 'local-storage';

import { Entry } from '../Utils'

class Storage {
    constructor() {
        this.key = 'account-entry-list';
    }

    /**
     * @param {Array<Entry>} entryList
     */
    write(entryList) {
        ls.set(
            this.key,
            entryList,
        );
    }

    /**
     * @returns {Array<Entry>}
     */
    read() {
        const list = [];

        const data = ls.get(this.key) || [];

        data.map((item) => {
            const entry = new Entry();

            entry.setUuid(item.uuid);
            entry.setUserName(item.userName);
            entry.setUserId(item.userId);
            entry.setAuthUrl(item.authUrl);

            list.push(entry);
        });

        return list;
    }
}

export default Storage;
