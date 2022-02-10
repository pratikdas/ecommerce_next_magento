// src/context/state.js
import { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  let [userCtx, setUserCtx] = useState({isAuth:false, user:{}})
  const value = useMemo(
    () => ({ userCtx, setUserCtx }), 
    [userCtx]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}