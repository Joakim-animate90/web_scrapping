import cheerio from 'cheerio';
import moment from 'moment';

const momentDate = (date) => {
    // convert  03/12/2022' to moment to iso format
    const momentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return momentDate;
}

export default function cheerioHelper(html) {
    const records = [];
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
                    return record[$(element).find('span').text().replace(':', '')] = $(element).next().find('span').text();
                } else {
                    return;
                }
            }).get();

            });
          records.push(record);
          console.log(records);
        });
    }



