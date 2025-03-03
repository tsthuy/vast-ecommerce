const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorageWithExpiration = <T>(
  key: string,
  defaultValue: T,
  expirationDays: number = 1 / 6
): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const storedData = localStorage.getItem(key);
  if (!storedData) {
    return defaultValue;
  }

  const parsedData = JSON.parse(storedData);
  if (Array.isArray(parsedData)) {
    const now = Date.now();
    const expirationMs = expirationDays * 24 * 60 * 60 * 1000;
    const filteredData = parsedData.filter(
      (item) => item.created_at && now - item.created_at < expirationMs
    );
    saveToLocalStorage(key, filteredData);
    return filteredData;
  }

  return parsedData;
};

export {
  loadFromLocalStorageWithExpiration,
  loadFromLocalStorage,
  saveToLocalStorage,
};
