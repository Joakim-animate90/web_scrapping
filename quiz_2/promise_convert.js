import fs from 'fs';
//use Promise
let promise = new Promise((resolve, reject) => {
    //read
    fs.readFile('./myfile.txt', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });


});
// Execute the promise using then, catch and print the file contents in lowercase
promise.then((data) => {
    console.log(data.toLowerCase());
}).catch((err) => {
    console.log(err);
});
// Execute the promise using async and await and print the file contents in uppercase
async function convert() {
    try {
        const data = await promise;
        console.log(data.toUpperCase());
    } catch (err) {
        console.log(err);
    }
}
convert();
//read file
