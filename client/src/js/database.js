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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  // content.preventDefault();


  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate','readwrite');

  const store = tx.objectStore('jate');
  try{
  const request = await store.add({
     data: content
    });
  const result = await request;


  console.log('Data was save to the database', result);
  }catch(err){
    console.log(err);
  }

  console.error('putDb not implemented')

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  
   console.log('Reached');
  const jateDB = await openDB( 'jate', 1 );
  console.log('reached past opening');

  // const objectStoreNames = jateDB.objectStoreNames;
  // console.log('Reached passed objectStore')

  // if(objectStoreNames.length == 0){
  //   return;
  // }

  const tx = jateDB.transaction( 'jate' , 'readonly');
  console.log('reached past transaction');
  
  const store = tx.objectStore('jate');

  try{
    console.log('reached try');
  const requests = await store.getAll();

  const result = await requests;
  console.log('result.value', result);

  return result;

  }catch(err){
    console.log('reached err');
    console.log(err);
  }


  console.error('getDb not implemented');
};

initdb();
