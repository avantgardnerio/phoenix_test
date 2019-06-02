import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import Main from '../components/Main';

interface Language {
    id: number;
    name: string;
    proverb: string;
}

interface ApiResponse {
    data: Language
}

interface ExampleState {
    language: Language,
    loading: boolean
}

export default class LanguageEditPage extends React.Component<any, ExampleState> {
    constructor(props: {}) {
        super(props);
        this.state = {language: {id: 0, name: '', proverb: ''}, loading: true};
        this.loadData(this.props.match.params.id)
    }

    loadData = (id: any) => {
        fetch(`/api/languages/${id}`)
            .then(response => response.json() as Promise<ApiResponse>)
            .then(data => {
                this.setState({ language: data.data, loading: false });
            });
    };

    public render(): JSX.Element {
        return (
            <Main>
                <h1>Edit Language</h1>
                <p>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={this.state.language.name}/>
                </p>
                <p>
                    <label htmlFor="proverb">Proverb</label>
                    <input id="proverb" type="text" value={this.state.language.proverb}/>
                </p>
                <button>Save</button>
            </Main>
        );
    }
}
