import nodeFetch from 'node-fetch';
import write_file from './write_file.js';
//create function to download pdf file
export default async function download_pdf(url, file) {

    //use try and catch
    try {
        //fetch pdf file
        const response = await nodeFetch(url);
        //convert to buffer
        const buffer = await response.buffer();
        //write pdf file
        await write_file(file, buffer);

    } catch (err) {
        console.log(err);

    }
}
