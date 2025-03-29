
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { registerUser, loginUser, logoutUser, onAuthChange, getCurrentUser } from '../utils/firebase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const { user, error } = await registerUser(email, password);
      if (error) {
        toast({
          title: 'Registration failed',
          description: error,
          variant: 'destructive',
        });
        return { success: false, error };
      }
      
      toast({
        title: 'Registration successful',
        description: 'You have successfully registered and logged in.',
      });
      return { success: true, error: null };
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error: error.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user, error } = await loginUser(email, password);
      if (error) {
        toast({
          title: 'Login failed',
          description: error,
          variant: 'destructive',
        });
        return { success: false, error };
      }
      
      toast({
        title: 'Login successful',
        description: 'You have successfully logged in.',
      });
      return { success: true, error: null };
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { success, error } = await logoutUser();
      if (!success) {
        toast({
          title: 'Logout failed',
          description: error,
          variant: 'destructive',
        });
        return { success: false, error };
      }
      
      toast({
        title: 'Logout successful',
        description: 'You have successfully logged out.',
      });
      return { success: true, error: null };
    } catch (error: any) {
      toast({
        title: 'Logout failed',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
