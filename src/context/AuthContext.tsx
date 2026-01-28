import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string) => {
    // Simulate authentication (in real app, this would call an API)
    const newUser: User = {
      email,
      name: email.split('@')[0],
      isGuest: false
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Save login to admin panel
    const existingLogins = JSON.parse(localStorage.getItem('userLogins') || '[]');
    const newLogin = {
      username: newUser.name,
      email: newUser.email,
      timestamp: new Date().toLocaleString()
    };
    existingLogins.push(newLogin);
    localStorage.setItem('userLogins', JSON.stringify(existingLogins));
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      email: 'guest@typingpractice.com',
      name: 'Guest',
      isGuest: true
    };
    setUser(guestUser);
    localStorage.setItem('user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAsGuest,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
