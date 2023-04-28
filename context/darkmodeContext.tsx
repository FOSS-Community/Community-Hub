import React, { createContext, useEffect, useState } from "react";

/* @ts-ignore */
const DarkmodeContext = createContext();

interface ProviderProps {
  children: React.ReactChild;
}

const DarkmodeProvider = ({ children }: ProviderProps) => {
  const [darkmode, setDarkmode] = useState(true);
  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
    const localDark = !darkmode;
    localStorage.setItem("darkMode", localDark.toString());
  };

  useEffect(() => {
    const local = localStorage.getItem("darkMode");
    setDarkmode(local === "true");
  }, []);

  return (
    <DarkmodeContext.Provider value={{ darkmode, toggleDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export { DarkmodeProvider, DarkmodeContext };
