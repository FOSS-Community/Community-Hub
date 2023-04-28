import React, { createContext, useEffect, useState } from "react";

/* @ts-ignore */
const CommandContext = createContext();

interface ProviderProps {
  children: React.ReactChild;
}

const CommandProvider = ({ children }: ProviderProps) => {
  const [command, setCommand] = useState(false);
  const toggleCommand = () => {
    setCommand(!command);
  };

  useEffect(() => {
    const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "k";

    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        toggleCommand();
      }
    };

    const ignore = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", ignore);
    };
  }, []);

  return (
    <CommandContext.Provider value={{ command, toggleCommand }}>
      {children}
    </CommandContext.Provider>
  );
};

export { CommandProvider, CommandContext };
