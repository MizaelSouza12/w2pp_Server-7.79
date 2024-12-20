export type CharacterClass = 'Warrior' | 'Archer' | 'Mage' | 'Priest' | 'Assassin' | 'Knight' | 'Warlock';

export interface Character {
  id: string;
  userId: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  level: number;
  stats: {
    damage?: number;
    defense?: number;
    health?: number;
    mana?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  description: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  level: number;
  rewards: {
    experience: number;
    gold: number;
    items?: string[];
  };
  requirements: {
    level: number;
    items?: string[];
    quests?: string[];
  };
  steps: {
    id: string;
    description: string;
    completed: boolean;
  }[];
}