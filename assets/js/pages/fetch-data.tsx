import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import Main from '../components/Main';

// The interface for our API response
interface ApiResponse {
  data: Language[];
}

// The interface for our Language model.
interface Language {
  id: number;
  name: string;
  proverb: string;
}

interface FetchDataExampleState {
  languages: Language[];
  loading: boolean;
  selectedId?: number;
}

export default class FetchDataPage extends React.Component<
  {},
  FetchDataExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = { languages: [], loading: true, selectedId: undefined };

    // Get the data from our API.
    fetch('/api/languages')
      .then(response => response.json() as Promise<ApiResponse>)
      .then(data => {
        this.setState({ languages: data.data, loading: false });
      });
  }

  private selectItem(language: Language) {
      this.setState({...this.state, selectedId: language.id});
  };

  private renderLanguagesTable(languages: Language[]) {
    return (
      <table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Example proverb</th>
          </tr>
        </thead>
        <tbody>
          {languages.map(language => (
            <tr key={language.id} onClick={() => this.selectItem(language)}>
              <td>{language.name}</td>
              <td>{language.proverb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  get content() {
      if(this.state.loading) {
          return (
              <p>
                  <em>Loading...</em>
              </p>
          )
      }
      if(this.state.selectedId) {
          return <Redirect to={`/languages/${this.state.selectedId}`}/>
      }
      return this.renderLanguagesTable(this.state.languages);
  }

  public render(): JSX.Element {
    return (
      <Main>
        <h1>Fetch Data</h1>
        <p>
          This component demonstrates fetching data from the Phoenix API
          endpoint.
        </p>
        {this.content}
        <br />
          <Link to="/add-language">Add Language</Link>
        <br />
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </Main>
    );
  }
}
