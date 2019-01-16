let createStorage;

createStorage = storageName => {
  const storage = window[storageName];

  return {
    get(key, defaultValue) {
      try {
        const item = storage.getItem(key);

        if (!item) {
          return defaultValue;
        }

        return JSON.parse(item);
      } catch (err) {
        // ignore error
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (err) {
        // ignore error
      }
    },
    remove(key) {
      try {
        storage.removeItem(key);
      } catch (err) {
        // ignore error
      }
    },
    clear() {
      storage.clear();
    }
  };
};

export default {
  local: createStorage("localStorage"),
  session: createStorage("sessionStorage")
};
