import cheerio from 'cheerio';
import moment from 'moment';



const momentDate = (date) => {
    // convert 05 Dec 2022 to moment to iso format
    const momentDate = moment(date, 'DD MMM YYYY').format('YYYY-MM-DD');
    return momentDate;

}

export default function cheerioHelper(html, posts) {
    const $ = cheerio.load(html);
    $('.post').each((index, element) => {

        //find each p and map its key value pairs to an object
        const post = $(element).find('p').map((index, element) => {
            // get the text of the p elements and remove the span elements


            return {
                [$(element).find('span').text().replace(':', '')]: $(element).find('span').remove()  ? $(element).text().replace(/(\r\n|\n|\r)/gm, "") : null,

            };
        }).get();
        // find date and convert to moment js and add to object post
        const date = $(element).find('.date-delivered').map((index, element) => {
            //convert date to moment js to use iso format
            return {
                [$(element).find('span').text().replace(':', '')]: momentDate($(element).find('span').remove() ? $(element).text() : null),
            }
        }).get();
        // find the case number and add to object post
        const caseNumber = $(element).find('.case-number').map((index, element) => {
            return {
                [$(element).find('span').text().replace(/(\r\n|\n|\r)/gm, "")]: $(element).text().replace(/(\r\n|\n|\r)/gm, "")
            };
        }).get();


        const title = $(element).find('h2').map((index, element) => {
            return {
                "title": $(element).text().replace(/(\r\n|\n|\r)/gm, "")
            };
        }).get();
        const link = $(element).find('a').map((index, element) => {
            return {
                "link": $(element).attr('href')
            };

        }).get();


        post.push(date[0], caseNumber[0], title[0], link[0]);


        posts.push(post);

    });

}
