import cheerio from 'cheerio';
import moment from 'moment';
import puppeteerHelper from './pupee_teer.js'
import rename_file from './rename_file.js';
import fs from "fs";
import path from "path";

const momentDate = (date) => {
    // convert  03/12/2022' to moment to iso format
    const momentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return momentDate;
}

export default function cheerioHelper(html, records, page) {

    const $ = cheerio.load(html);
    $('.ui-scrollpanel-content').each((index, element) => {
        const record = {};

        //find every tr
        $(element).find('tr').each((index, element) => {

            //find every td and map the first td to the key and the second td to the value
            $(element).find('td').map((index, element) => {
                if (index === 0) {
                    //if key is date, convert to moment js
                    if ($(element).text().trim() === 'Fecha') {
                        record['date'] = momentDate($(element).next().find('span').text().trim());

                    }
                    return record[$(element).find('span').text().replace(':', " ").trim()] = $(element).next().find('span').text();
                } else {
                    return;
                }
            });
            //click page to download pdf file using async and await
            //use async function
            async function downloadFile(record, index) {
                await page.click(`#formularioConsultar\\:dgArchivos\\:0\\:j_idt${148 + 2}`);

            }

            downloadFile(record, index).then(() => {
                //rename the file using the NR value
                const dir = "./downloads";
                //use the value of key NR as the new file name
                const newFileName = record[0].NR;


                //use fs.readdir to read the directory
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        console.log(err);
                    } else {
                        //use fs.rename to rename the file
                        fs.rename(path.join(JSON.parse(dir), files[0]), path.join(JSON.parse(dir), JSON.parse(newFileName + '.pdf')), (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('File renamed successfully');
                            }
                        });
                    }
                });
            });



            });

          console.log('Timeout 5000s');
          records.push(record)
          console.log(records);
        });
    }



