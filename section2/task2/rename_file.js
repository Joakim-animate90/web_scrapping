import fs from 'fs';
import path from 'path';

//create a function to rename the first file in a directory



export default async function rename_file(record) {

    //dir where the folder is located and convert it to array of strings
    const dir = fs.readdirSync(path.resolve("./downloads"));

    //find the first file in the directory and rename it using renameSync and handle error
    try {
        fs.renameSync(path.resolve("./downloads", dir[0]), path.resolve("./downloads", record['NR'] + '.pdf'));
    } catch (err) {
        console.log(err);
    }

    }



