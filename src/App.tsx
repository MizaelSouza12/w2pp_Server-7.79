import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { CharacterCreation } from './components/game/CharacterCreation';
import { GameInterface } from './components/game/GameInterface';
import { useGameStore } from './stores/gameStore';
import { useAuthStore } from './stores/authStore';

function App() {
  const { user, setUser } = useAuthStore();
  const { character, loadCharacter } = useGameStore();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadCharacter();
    }
  }, [user]);

  if (!user) {
    return showRegister ? (
      <div>
        <RegisterForm />
        <button
          onClick={() => setShowRegister(false)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white"
        >
          Already have an account? Sign in
        </button>
      </div>
    ) : (
      <div>
        <LoginForm />
        <button
          onClick={() => setShowRegister(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white"
        >
          Need an account? Register
        </button>
      </div>
    );
  }

  if (!character) {
    return <CharacterCreation />;
  }

  return <GameInterface />;
}