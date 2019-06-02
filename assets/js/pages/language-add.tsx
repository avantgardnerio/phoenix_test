import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import Main from '../components/Main';

interface ExampleState {
    name: String,
    proverb: String,
    saved: boolean
}

export default class LanguageAddPage extends React.Component<
    {},
    ExampleState
    > {
    constructor(props: {}) {
        super(props);
        this.state = { name: "", proverb: "", saved: false};
    }

    private change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(this.state);
        this.setState({...this.state, [e.target.id]: e.target.value})
    };

    private save = () => {
        const json = JSON.stringify({language: {name: this.state.name, proverb: this.state.proverb}});
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        };
        fetch('/api/languages', options)
            .then(res => res.json())
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
                <h1>Add Language</h1>
                <p>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.change}/>
                </p>
                <p>
                    <label htmlFor="proverb">Proverb</label>
                    <input id="proverb" type="text" onChange={this.change}/>
                </p>
                <button onClick={this.save}>Save</button>
            </Main>
        );
    }
}
