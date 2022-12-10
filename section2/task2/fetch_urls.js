
 import puppeteer from 'puppeteer';

const url = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/';



const scrape = async () => {
    // launch the browser
    const browser = await puppeteer.launch({headless: false});
    // create a new page
    const page = await browser.newPage();
    // navigate to the url
    await page.goto(url);

    //click on the tribunale superiores de justicia
    await page.click('#formularioConsultar\\:corporaciones\\:2\\:j_idt142', {delay: 5000});

    await page.waitForNavigation({waitUntil: 'networkidle2', delay : 2000});

    //set timeout
    await page.waitForTimeout(10000);


    //click on the fecha inicial input and type the date and remove the readonly attribute
    await page.click('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input');

    await page.evaluate(() => {
        // remove the readonly attribute from the input
        document.querySelector('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input').removeAttribute('readonly');


    });
    try {

        // type the date in the fecha inicial input
        await page.type('#formularioConsultar\\:dtCampos\\:7\\:calInicio_input', '03/12/2022', {delay:1000});

    } catch (err) {
        console.log(err);
    }
    //type the date in the fecha final input
    await page.click('#formularioConsultar\\:dtCampos\\:7\\:calFin_input');

    await page.evaluate(() => {
        // remove the readonly attribute from the input
           document.querySelector('#formularioConsultar\\:dtCampos\\:7\\:calFin_input').removeAttribute('readonly');

    });
        // type the date in the input and use it as a value
    try {

        await page.type('#formularioConsultar\\:dtCampos\\:7\\:calFin_input', '04/12/2022', {delay: 1000});

    } catch (err) {
        console.log(err);

    }

        page.click('#formularioConsultar\\:btBuscarAvanzada',{waitUntil : "load"}),

            //delay page content
    await page.waitForTimeout(50000);

    console.log(await page.content());


}
scrape().catch((err) => {
    console.log(err);

});



