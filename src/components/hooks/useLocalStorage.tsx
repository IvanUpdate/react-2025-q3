import { useState } from 'react';

export function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : defaultValue;
    } catch (err) {
      console.error('Failed to access localStorage:', err);
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: string) => {
    try {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (err) {
      console.error('Failed to write to localStorage:', err);
    }
  };

  return [value, setStoredValue] as const;
}
