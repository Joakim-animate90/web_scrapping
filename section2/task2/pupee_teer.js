
import puppeteer from 'puppeteer';
import cheerioHelper from './cheerio_helper.js';

const url = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/';



export default async function puppeteerHelper() {
    const records = [];
    // launch the browser
    const browser = await puppeteer.launch({headless: false});
    // create a new page
    const page = await browser.newPage();
    //set download path
    await page.target().createCDPSession().then((client) => {
        client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: './downloads',

        });
    });

    // navigate to the url
    await page.goto(url);

    //click on the tribunale superiores de justicia
    await page.click('#formularioConsultar\\:corporaciones\\:2\\:j_idt142', {delay: 5000});

    await page.waitForNavigation({waitUntil: 'networkidle2', delay : 2000});

    //set timeout
    await page.waitForTimeout(11000);


    //click on the fecha inicial input and type the date and remove the readonly attribute
    await page.click('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input');

    await page.evaluate(() => {
        // remove the readonly attribute from the input
        document.querySelector('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input').removeAttribute('readonly');


    });

    // type the date in the fecha inicial input
    await page.type('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input', '03/12/2022', {delay: 1000});

    //type the date in the fecha final input
    await page.click('#formularioConsultar\\:dtCampos\\:7\\:calFin_input');

    await page.evaluate(() => {
        // remove the readonly attribute from the input
           document.querySelector('#formularioConsultar\\:dtCampos\\:7\\:calFin_input').removeAttribute('readonly');

    });

    // type the date in the input and use it as a value
    await page.type('#formularioConsultar\\:dtCampos\\:7\\:calFin_input', '04/12/2022', {delay: 500});

    page.click('#formularioConsultar\\:btBuscarAvanzada',{waitUntil : "load"});

    //delay page content
    await page.waitForTimeout(50000);

    const html = await page.content();
    cheerioHelper(html, records, page);






    }







