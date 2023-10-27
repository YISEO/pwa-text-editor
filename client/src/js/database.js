import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  // Create a connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database
  const tx = jateDB.transaction('jate', 'readwrite');
  // Open up the desired object store
  const store = tx.objectStore('jate');
  // Use the .put() method to modify the data
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to the database', result);
};


export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get all request
  const request = store.getAll();

  const result = await request;
  console.log('Data read from database', result);
  return result.value;
};

initdb();
