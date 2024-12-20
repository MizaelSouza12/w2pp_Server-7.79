import { useGameStore } from '../../../stores/gameStore';

export function CharacterHUD() {
  const { character } = useGameStore();

  if (!character) return null;

  return (
    <div className="absolute top-4 left-4 flex items-center gap-3">
      {/* Character Avatar */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-purple-900 to-purple-600 border-2 border-purple-400 flex items-center justify-center">
        <span className="text-2xl text-white font-medieval">{character.level}</span>
      </div>

      {/* Health & Mana Bars */}
      <div className="space-y-2">
        {/* Health Bar */}
        <div className="w-48 h-4 bg-gray-900 rounded border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-red-900 to-red-600 rounded"
            style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
          />
          <div className="relative -top-4 text-center text-xs text-white">
            {character.health}/{character.maxHealth}
          </div>
        </div>

        {/* Mana Bar */}
        <div className="w-48 h-4 bg-gray-900 rounded border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-900 to-blue-600 rounded"
            style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
          />
          <div className="relative -top-4 text-center text-xs text-white">
            {character.mana}/{character.maxMana}
          </div>
        </div>
      </div>
    </div>
  );
}