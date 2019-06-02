import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import Main from '../components/Main';

interface ExampleState {
}

export default class LanguageEditPage extends React.Component<
    {},
    ExampleState
    > {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <Main>
                <h1>Edit Language</h1>
                <p>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text"/>
                </p>
                <p>
                    <label htmlFor="proverb">Proverb</label>
                    <input id="proverb" type="text"/>
                </p>
                <button>Save</button>
            </Main>
        );
    }
}
