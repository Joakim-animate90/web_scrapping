//import fs module
import fs from 'fs';
//export default function to write file
export default function write_file(file, data) {
    //use promise
    let promise = new Promise ((resolve, reject) => {

        //write file
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('File written successfully');
            }
        }
    });
}