import { useEffect, useState } from 'react';
import type { Character } from '../Results/Results';

const CharacterDetails = ({ id }: { id: string }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await res.json();
      setCharacter(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (!character) return <p>No details available</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">{character.name}</h2>
      <img
        src={character.image}
        alt={character.name}
        className="rounded mt-2"
      />
      <p className="mt-2">Species: {character.species}</p>
    </div>
  );
};

export default CharacterDetails;
