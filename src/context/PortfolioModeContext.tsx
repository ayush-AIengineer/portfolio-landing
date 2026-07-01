import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type PortfolioMode = 'personal' | 'freelance' | 'agency';

interface PortfolioModeContextValue {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
}

const PortfolioModeContext = createContext<PortfolioModeContextValue>({
  mode: 'personal',
  setMode: () => {},
});

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  // Single unified personal portfolio — freelance/agency modes removed per build plan.
  const [mode, setModeState] = useState<PortfolioMode>('personal');

  const setMode = useCallback((newMode: PortfolioMode) => {
    setModeState(newMode);
  }, []);

  return (
    <PortfolioModeContext.Provider value={{ mode, setMode }}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  return useContext(PortfolioModeContext);
}
