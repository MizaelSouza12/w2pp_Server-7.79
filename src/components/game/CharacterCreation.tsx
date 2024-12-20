import { useState } from 'react';
import { CharacterClass } from '../../types/game';
import { useGameStore } from '../../stores/gameStore';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';

const CHARACTER_CLASSES: CharacterClass[] = [
  'Warrior', 'Archer', 'Mage', 'Priest', 'Assassin', 'Knight', 'Warlock'
];

export function CharacterCreation() {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('Warrior');
  const { createCharacter, loading, error } = useGameStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCharacter(name, selectedClass);
  };

  return (
    <Panel className="w-96">
      <h2 className="text-2xl text-amber-100 font-medieval text-center mb-6">Create Character</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-amber-200">Character Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded bg-black/50 border-amber-900/50 text-amber-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-200 mb-2">Class</label>
          <div className="grid grid-cols-2 gap-2">
            {CHARACTER_CLASSES.map((characterClass) => (
              <button
                key={characterClass}
                type="button"
                onClick={() => setSelectedClass(characterClass)}
                className={`p-2 rounded ${
                  selectedClass === characterClass
                    ? 'bg-amber-600 text-white'
                    : 'bg-black/50 text-amber-100 hover:bg-amber-900/50'
                }`}
              >
                {characterClass}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !name}
          className="w-full"
        >
          {loading ? 'Creating...' : 'Create Character'}
        </Button>
      </form>
    </Panel>
  );
}