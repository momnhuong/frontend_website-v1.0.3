function getStore(key) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        resolve(JSON.parse(data));
      }
    } catch (error) {
      reject(error);
    }
  });
}

function setStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Set ${key} successfull`);
  } catch (error) {
    console.log(`Set ${key} error is ${error}`);
  }
}

function removeStore(key) {
  try {
    localStorage.removeItem(key);
    console.log(`Remove ${key} successfull`);
  } catch (error) {
    console.log(`Remove ${key} error is ${error}`);
  }
}

export { getStore, setStore, removeStore };
