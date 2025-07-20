import React from 'react';

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
};

type ResultsProps = {
  results: Character[];
  loading: boolean;
  error: string | null;
};

class Results extends React.Component<ResultsProps> {
  render() {
    const { results, loading, error } = this.props;

    if (loading) {
      return <p className="text-center text-lg animate-pulse">🔄 Loading...</p>;
    }

    if (error) {
      return <p className="text-center text-red-400 font-bold">{error}</p>;
    }

    if (results.length === 0) {
      return <p className="text-center text-gray-300">No results found.</p>;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((char) => (
          <div
            key={char.id}
            className="bg-[#1a1a2e] p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full rounded-lg mb-2"
            />
            <h3 className="text-lg font-bold">{char.name}</h3>
            <p className="text-sm text-gray-400">{char.species}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
