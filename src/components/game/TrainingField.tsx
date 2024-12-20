import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';

interface Monster {
  id: string;
  name: string;
  level: number;
  health: number;
  experience: number;
}

const TRAINING_MONSTERS: Monster[] = [
  { id: 'rat', name: 'Giant Rat', level: 1, health: 50, experience: 25 },
  { id: 'wolf', name: 'Wild Wolf', level: 3, health: 100, experience: 50 },
  { id: 'ogre', name: 'Young Ogre', level: 5, health: 200, experience: 100 },
];

export function TrainingField() {
  const { character, updateExperience } = useGameStore();
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [fighting, setFighting] = useState(false);

  const attack = async (monster: Monster) => {
    if (!character || fighting) return;
    
    setFighting(true);
    setCombatLog(prev => [...prev, `You engage the ${monster.name}!`]);

    // Simple combat simulation
    const damage = Math.floor(
      (character.strength * 2 + character.dexterity) * 
      (0.8 + Math.random() * 0.4)
    );

    setCombatLog(prev => [...prev, `You deal ${damage} damage!`]);
    
    // Monster defeated
    await updateExperience(monster.experience);
    setCombatLog(prev => [
      ...prev,
      `You defeated the ${monster.name}!`,
      `Gained ${monster.experience} experience!`
    ]);

    setTimeout(() => {
      setFighting(false);
      if (combatLog.length > 10) {
        setCombatLog([]);
      }
    }, 2000);
  };

  if (!character) return null;

  return (
    <Panel className="w-full max-w-2xl">
      <h2 className="text-2xl text-amber-100 font-medieval text-center mb-6">Training Field</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg text-amber-200">Available Monsters</h3>
          {TRAINING_MONSTERS.map(monster => (
            <div key={monster.id} className="flex items-center justify-between p-3 bg-black/30 rounded">
              <div>
                <div className="text-amber-100">{monster.name}</div>
                <div className="text-sm text-gray-400">Level {monster.level}</div>
              </div>
              <Button
                onClick={() => attack(monster)}
                disabled={fighting || monster.level > character.level}
                variant="secondary"
              >
                Attack
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg text-amber-200 mb-4">Combat Log</h3>
          <div className="h-64 overflow-y-auto bg-black/30 p-4 rounded">
            {combatLog.map((log, i) => (
              <div key={i} className="text-amber-100 mb-1">{log}</div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}