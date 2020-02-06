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
        this.export = this.export.bind(this);
    }

    componentDidMount() {
        const entryList = storage.read();

        this.setState({
            entryList,
        });
    }

    export() {
        const { entryList } = this.state;

        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(entryList)], { type: 'text/plain' });
        element.id = 'downloader';
        element.href = URL.createObjectURL(file);
        element.download = 'redirector.json';
        document.body.appendChild(element);
        element.click();
        element.parentNode.removeChild(element);
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
                                onExport={this.export}
                            />
                        </div>
                    </div>
                </aside>
                <main className="main">
                    <div className="content-container">
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
