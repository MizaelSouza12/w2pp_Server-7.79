import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { CharacterHUD } from './hud/CharacterHUD';
import { Inventory } from './inventory/Inventory';
import { GameWorld } from './world/GameWorld';
import { ActionBar } from './hud/ActionBar';
import { GameMenu } from './menu/GameMenu';

export function GameInterface() {
  const { character } = useGameStore();
  const [showInventory, setShowInventory] = useState(false);

  if (!character) return null;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Game World */}
      <GameWorld />

      {/* Character HUD */}
      <CharacterHUD />

      {/* Inventory (Toggle) */}
      {showInventory && <Inventory onClose={() => setShowInventory(false)} />}

      {/* Bottom Action Bar */}
      <ActionBar onInventoryClick={() => setShowInventory(true)} />

      {/* Menu Button */}
      <GameMenu />
    </div>
  );
}