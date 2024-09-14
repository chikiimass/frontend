"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  changeTheme: (theme: string) => void;
}


export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className='font-bold uppercase'>
          chikiimass
        </div>
      </div>
    );
    
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};