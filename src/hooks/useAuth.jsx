import { useState } from 'react';

export function useAuth() {
  // Simule un utilisateur connecté
  const [user, setUser] = useState(null);
  console.log('====================================');
  console.log("User connected: user", user);
  console.log('====================================');
  return { user, setUser };
}
