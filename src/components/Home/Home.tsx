import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
import Results from '../Results/Results';
import CharacterDetails from '../Details/CharacterDetails';
import Pagination from '../Pagination/Pagination';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

const Home = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<{ pages: number } | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const details = searchParams.get('details');
  const request = searchParams.get('q') || '';

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      const query = `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(request)}`;
      const res = await fetch(query);

      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
        setInfo(data.info);
      } else {
        setError('Character not found');
        setResults([]);
        setInfo(null);
      }

      setLoading(false);
    };

    fetchCharacters();
  }, [page, request]);

  const handleSearch = (value: string) => {
    setSearchParams({ q: value, page: '1' });
  };

  const handleCloseDetails = () => {
    setSearchParams({ q: request, page: page.toString() });
  };

  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-slate-900 text-white">
      <div className="flex-none">
        <Search request={request} handleSearch={handleSearch} />
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div
          className={`flex-1 overflow-y-auto ${details ? 'w-1/2' : 'w-full'}`}
        >
          <Results results={results} loading={loading} error={error} />
          {info && <Pagination currentPage={page} totalPages={info.pages} />}
        </div>

        {details && (
          <div className="w-1/2 p-4 bg-slate-800 overflow-y-auto rounded-xl relative">
            <button
              onClick={handleCloseDetails}
              className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded"
            >
              Close
            </button>
            <CharacterDetails id={details} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
