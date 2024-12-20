import { useGameStore } from '../../stores/gameStore';
import { Panel } from '../ui/Panel';

export function CharacterStats() {
  const { character } = useGameStore();

  if (!character) return null;

  return (
    <Panel className="w-80">
      <h2 className="text-xl text-amber-100 font-medieval text-center mb-4">
        {character.name}
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-amber-200">Class</span>
          <span className="text-amber-100">{character.class}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-amber-200">Level</span>
          <span className="text-amber-100">{character.level}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-amber-200">Experience</span>
          <span className="text-amber-100">{character.experience}</span>
        </div>

        <div className="h-px bg-amber-900/50 my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-amber-200">Strength</span>
            <span className="text-amber-100">{character.strength}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-amber-200">Dexterity</span>
            <span className="text-amber-100">{character.dexterity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-amber-200">Intelligence</span>
            <span className="text-amber-100">{character.intelligence}</span>
          </div>
        </div>

        <div className="h-px bg-amber-900/50 my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-amber-200">Health</span>
            <span className="text-amber-100">{character.health}/{character.maxHealth}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-amber-200">Mana</span>
            <span className="text-amber-100">{character.mana}/{character.maxMana}</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}