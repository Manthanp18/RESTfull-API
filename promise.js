const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1); //pending => resolve, filfilled
        reject(new Error('message'));//panding => reject
    }, 2000);
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message))