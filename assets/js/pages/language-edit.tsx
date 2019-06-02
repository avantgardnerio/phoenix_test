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
    loading: boolean,
    saved: boolean
}

export default class LanguageEditPage extends React.Component<any, ExampleState> {
    constructor(props: {}) {
        super(props);
        this.state = {language: {id: 0, name: '', proverb: ''}, loading: true, saved: false};
        this.loadData(this.props.match.params.id)
    }

    loadData = (id: any) => {
        fetch(`/api/languages/${id}`)
            .then(response => response.json() as Promise<ApiResponse>)
            .then(data => {
                this.setState({ language: data.data, loading: false });
            });
    };

    private change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(this.state);
        const newState = {
            language: {...this.state.language, [e.target.id]: e.target.value}
        };
        this.setState(newState)
    };

    private save = () => {
        const json = JSON.stringify({
            id: this.state.language.id,
            language: {
                name: this.state.language.name,
                proverb: this.state.language.proverb
            }
        });
        const options = {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        };
        fetch(`/api/languages/${this.state.language.id}`, options)
            .then(res => res.json())
            .then(res => {
                // TODO: check result
                this.setState({...this.state, saved: true});
            });
    };

    private delete = () => {
        fetch(`/api/languages/${this.state.language.id}`, { method: 'delete' })
            .then(res => {
                // TODO: check result
                this.setState({...this.state, saved: true});
            });
    };

    public render(): JSX.Element {
        if(this.state.saved) {
            return <Redirect to='/fetch-data' />;
        }
        return (
            <Main>
                <h1>Edit Language</h1>
                <p>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.change} value={this.state.language.name}/>
                </p>
                <p>
                    <label htmlFor="proverb">Proverb</label>
                    <input id="proverb" type="text" onChange={this.change} value={this.state.language.proverb}/>
                </p>
                <button onClick={this.save}>Save</button>
                <button onClick={this.delete}>Delete</button>
            </Main>
        );
    }
}
