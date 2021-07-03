import React, { useContext, createContext, useState, useEffect } from "react";
import usersService from "./services/users";

const DarkModeContext = createContext();
const DarkModeUpdateContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const useDarkModeUpdate = () => {
  return useContext(DarkModeUpdateContext);
};

export const DarkModeProvider = ({ children }) => {
  const [darkModeOn, setDarkModeOn] = useState(null);

  // Load user's saved dark mode setting
  useEffect(() => {
    const setDefaultDarkMode = async () => {
      const setting = await usersService.getDarkModePref();
      console.log(setting);
      setDarkModeOn(setting);
    };
    setDefaultDarkMode();
  }, []);

  const handleSetDarkMode = setting => {
    console.log(setting);
    setDarkModeOn(setting);
  };

  return (
    <DarkModeContext.Provider value={darkModeOn}>
      <DarkModeUpdateContext.Provider value={handleSetDarkMode}>
        {children}
      </DarkModeUpdateContext.Provider>
    </DarkModeContext.Provider>
  );
};
