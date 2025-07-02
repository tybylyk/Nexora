import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@crm.com',
    role: 'admin',
    department: 'Management',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@crm.com',
    role: 'manager',
    department: 'Sales',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['team_management', 'call_monitoring', 'analytics']
  },
  {
    id: '3',
    name: 'Mike Leader',
    email: 'leader@crm.com',
    role: 'team_leader',
    department: 'Support',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['team_view', 'call_monitoring']
  },
  {
    id: '4',
    name: 'Lisa HR',
    email: 'hr@crm.com',
    role: 'hr',
    department: 'Human Resources',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['candidate_management', 'interviews']
  },
  {
    id: '5',
    name: 'Alex Agent',
    email: 'agent@crm.com',
    role: 'call_center',
    department: 'Support',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['calls', 'messages', 'time_tracking']
  },
  {
    id: '6',
    name: 'Emma Intern',
    email: 'intern@crm.com',
    role: 'intern',
    department: 'Support',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: ['notes_only']
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('crmUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('crmUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crmUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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