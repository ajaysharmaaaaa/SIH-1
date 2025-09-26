import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, QuizResult } from '../types';

interface UserContextType {
  user: User | null;
  login: (userData: Omit<User, 'id' | 'savedColleges'>) => void;
  logout: () => void;
  updateQuizResult: (result: QuizResult) => void;
  toggleSavedCollege: (collegeId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Omit<User, 'id' | 'savedColleges'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      savedColleges: []
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateQuizResult = (result: QuizResult) => {
    if (user) {
      setUser({ ...user, quizResults: result });
    }
  };

  const toggleSavedCollege = (collegeId: string) => {
    if (user) {
      const savedColleges = user.savedColleges.includes(collegeId)
        ? user.savedColleges.filter(id => id !== collegeId)
        : [...user.savedColleges, collegeId];
      setUser({ ...user, savedColleges });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateQuizResult, toggleSavedCollege }}>
      {children}
    </UserContext.Provider>
  );
};