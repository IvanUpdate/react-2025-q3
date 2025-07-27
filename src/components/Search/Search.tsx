import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Search = ({
  request,
  handleSearch,
}: {
  request: string;
  handleSearch: (value: string) => void;
}) => {
  const [input, setInput] = useLocalStorage('searchTerm', request || '');

  useEffect(() => {
    if (!request) {
      handleSearch(input);
    }
  }, []);

  const triggerSearch = () => {
    const trimmed = input.trim();
    handleSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') triggerSearch();
  };

  return (
    <div className="flex w-full max-w-2xl mx-auto items-center space-x-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow px-6 py-3 rounded-full bg-transparent border-2 border-[#00ffcc] text-white"
        placeholder="Search characters..."
      />
      <button
        onClick={triggerSearch}
        className="px-6 py-3 rounded-full bg-[#00ffcc] text-[#0f0f0f] font-bold"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
