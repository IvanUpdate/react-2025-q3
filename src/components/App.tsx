import { Component, type ReactNode } from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

interface AppState {
  request: string;
  results: Character[];
  loading: boolean;
  error: string | null;
  crash: boolean;
}

class ErrorThrower extends Component {
  render(): ReactNode {
    throw new Error('💥 Manual test error from ErrorThrower component');
  }
}

class App extends Component<{}, AppState> {
  state: AppState = {
    request: '',
    results: [],
    loading: false,
    error: null,
    crash: false,
  };

  componentDidMount() {
    const saved = localStorage.getItem('searchTerm') || '';
    this.setState({ request: saved });
    this.fetchCharacters(saved);
  }

  fetchCharacters = async (query: string) => {
    this.setState({ loading: true, error: null });
    try {
      const endpoint = query
        ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
        : `https://rickandmortyapi.com/api/character`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Character not found');
      const data = await res.json();
      this.setState({ results: data.results, loading: false });
    } catch (err: any) {
      console.error(err);
      this.setState({ error: err.message, results: [], loading: false });
    }
  };

  handleSearch = (value: string) => {
    this.setState({ request: value });
    localStorage.setItem('searchTerm', value);
    this.fetchCharacters(value);
  };

  triggerCrash = () => {
    this.setState({ crash: true });
  };

  render() {
    const { request, results, loading, error, crash } = this.state;

    return (
      <ErrorBoundary>
        <div className="h-screen flex flex-col gap-4 p-4 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a2e] text-white font-sans">
          <div className="flex-[3] rounded-3xl bg-gradient-to-r from-[#00ffcc] via-[#00e0ff] to-[#8e2de2] shadow-lg p-6 flex items-center justify-center animate-pulse-slow">
            <Search request={request} handleSearch={this.handleSearch} />
          </div>

          <div className="flex-[7] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#2f2fa2] to-[#1a1a40] shadow-inner p-4">
            {crash ? (
              <ErrorThrower />
            ) : (
              <>
                <Results results={results} loading={loading} error={error} />
                <button
                  onClick={this.triggerCrash}
                  className="mt-6 mx-auto block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Throw Test Error
                </button>
              </>
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
