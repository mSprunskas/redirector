import React, { PureComponent } from 'react';

import { Storage, Entry, getDefaultUrl } from '../Utils';
import EntryList from './EntryList';
import Form from './Form';

const storage = new Storage();

class Page extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            entryList: [],
        };

        this.onUpdated = this.onUpdated.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        const entryList = storage.read();

        this.setState({
            entryList,
        });
    }

    /**
     * @param {Entry} entry
     */
    onUpdated(entry) {
        const { entryList } = this.state;

        entryList.push(entry);

        this.update(entryList);
    }

    /**
     * @param {string} uuid
     */
    onDelete(uuid) {
        const { entryList } = this.state;

        const filtered = entryList.filter(item => item.getUuid() !== uuid);

        this.update(filtered);
    }

    update(list) {
        let { authUrl } = this.state;

        const updatedList = [...list];

        this.setState(
            {
                entryList: updatedList,
            },
            () => {
                storage.write(updatedList);
            }
        );
    }

    render() {
        const { entryList } = this.state;

        return (
            <div>
                <aside className="sidebar">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Form
                                defaultUrl={getDefaultUrl(entryList)}
                                onUpdate={this.onUpdated}
                            />
                        </div>
                    </div>
                </aside>
                <main className="main">
                    <div className="doc-container">
                        <EntryList
                            entries={entryList}
                            onDelete={this.onDelete}
                        />
                    </div>
                </main>
            </div>
        );
    }
}

export default Page;
