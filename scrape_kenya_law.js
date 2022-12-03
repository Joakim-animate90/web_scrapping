import fetch, {FormData} from 'node-fetch';

//import cheerio
import cheerio from 'cheerio';

// import fs a module for writing files to disk
import fs from 'fs';

//use a kenya high court url that provides an advanced search

const url = 'http://kenyalaw.org/caselaw/cases/advanced_search';

// initialize a form data object
const formData = new FormData();

// add the search parameters to the form data object
formData.set('date_from', ' 2022-01-01');
formData.set('date_to', '2022-01-31');

// create a html file without an extension to write the results to
const file = "kenya_law";
const posts = [];
// fetch the url with the form data using async and await and the fetch module

const scrape = async () => {

    // loop through five pages of the search results
    for (let i = 0; i < 50; i+= 10) {
        // on fetching the first page, the page and the number is not included in the url
        if (i === 0) {
            // fetch the url with the form data
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            // get the response text
            const html = await response.text();
            // on response convert date to moment to js

            // write the response text to the file and log the response or error
            fs.writeFile(`./public_html/${file}.html`, html, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    const $ = cheerio.load(html);
                    $('.post').each((index, element) => {

                        //find each post and extract the metadata and provide
                        const post = $(element).find('p').text().replace(/\s\s+/g, ' ');
                        posts.push(post);

                    });

                    }
                    console.log('success');
                });

        } else {

            // on fetching the second page and beyond, the page number is included in the url
            const response = await fetch(`${url}/page/${i}`, {
                method: 'POST',
                body: formData
            });
            const html = await response.text();
            const $ = cheerio.load(html);
            $('.post').each((index, element) => {

                //find each post and extract the metadata and provide
                const post = $(element).find('p').text().replace(/\s\s+/g, ' ');
                posts.push(post);

            });

            // append the response text to a new html file and log the response or error
            fs.writeFile(`./public_html/${file}${i}.html`, html, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('success');
                }});
            }
        }
    // log the metadata
    console.log(posts);
    // log the number of posts
    console.log(posts.length);

}
// call the scrape function and log any errors
scrape().catch(console.error);


