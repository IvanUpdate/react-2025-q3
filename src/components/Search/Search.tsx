import { Component, type ChangeEvent, type KeyboardEvent } from 'react';

type SearchProps = {
  request: string;
  handleSearch: (value: string) => void;
};

type SearchState = {
  input: string;
};

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const saved = localStorage.getItem('searchTerm') || props.request || '';
    this.state = { input: saved };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') this.triggerSearch();
  };

  triggerSearch = () => {
    const trimmed = this.state.input.trim();
    this.props.handleSearch(trimmed);
    localStorage.setItem('searchTerm', trimmed);
  };

  render() {
    return (
      <div className="flex w-full max-w-2xl mx-auto items-center space-x-4">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search Rick, Morty..."
          className="flex-grow px-6 py-3 rounded-full bg-transparent border-2 border-[#00ffcc] text-white placeholder-[#9effe3] outline-none transition focus:ring-4 focus:ring-[#00ffcc]/50 backdrop-blur-md"
        />
        <button
          onClick={this.triggerSearch}
          className="px-6 py-3 rounded-full bg-[#00ffcc] text-[#0f0f0f] font-bold uppercase tracking-wide shadow-lg hover:bg-[#00e0ff] transition animate-pulse hover:scale-105"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
