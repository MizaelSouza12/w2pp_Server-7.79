import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Character, CharacterClass } from '../types/game';

interface GameState {
  character: Character | null;
  loading: boolean;
  error: string | null;
  createCharacter: (name: string, characterClass: CharacterClass) => Promise<void>;
  loadCharacter: () => Promise<void>;
  updateExperience: (amount: number) => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  character: null,
  loading: false,
  error: null,

  createCharacter: async (name: string, characterClass: CharacterClass) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('characters')
        .insert([{
          user_id: user.id,
          name,
          class: characterClass,
        }])
        .select()
        .single();

      if (error) throw error;
      set({ character: data as Character });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create character' });
    } finally {
      set({ loading: false });
    }
  },

  loadCharacter: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      set({ character: data as Character });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to load character' });
    } finally {
      set({ loading: false });
    }
  },

  updateExperience: async (amount: number) => {
    const { character } = get();
    if (!character) return;

    try {
      const newExperience = character.experience + amount;
      const newLevel = Math.floor(Math.sqrt(newExperience / 100)) + 1;
      
      const { data, error } = await supabase
        .from('characters')
        .update({
          experience: newExperience,
          level: newLevel,
          strength: character.strength + (newLevel > character.level ? 2 : 0),
          dexterity: character.dexterity + (newLevel > character.level ? 2 : 0),
          intelligence: character.intelligence + (newLevel > character.level ? 2 : 0),
        })
        .eq('id', character.id)
        .select()
        .single();

      if (error) throw error;
      set({ character: data as Character });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update experience' });
    }
  },
}));