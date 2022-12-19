import nodeFetch, {FormData} from 'node-fetch';
import makeFetchCookie from 'fetch-cookie';
import jsdom from 'jsdom';

const {JSDOM} = jsdom;
import cheerioHelp from './cheerioHelp.js';

const formelementId = 'formularioConsultar';
const url = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/';
const fetchCookie = makeFetchCookie(nodeFetch, new makeFetchCookie.toughCookie.CookieJar());
const formData = new FormData();
const records = [];

const options = {
    credentials: 'include',
    headers: {

        'Content-Type': 'application/x-www-form-urlencoded',
        'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3',
        'Referer': url,
        'Upgrade-Insecure-Requests': '1',
    }

}


export default async function fetchHelper() {


    await fetchCookie(url, options).then(async (res) => {

        console.log('first fetch done');
        options.headers['Cookie'] = res.headers.get('set-cookie');


        await fetchCookie('https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/faces/consulta/ConsultaCorporacion.xhtml', options).then(async (res) => {
            console.log('second fetch done');

            //use jsdom to get the form element
            const dom = new JSDOM(await res.text(), {url: url});
            const form = dom.window.document.getElementById(formelementId);

            //remove readonly attribute from inputs
            form.querySelectorAll('input').forEach((input) => {
                input.removeAttribute('readonly');

            });

            //set the  formularioConsultar:dtCampos:7:calInicio_input to 03/01/2022
            formData.append('formularioConsultar:dtCampos:7:calInicio_input', '03/01/2022');
            //set the formularioConsultar:dtCampos:7:calFin_input to 03/12/2022
            formData.append('formularioConsultar:dtCampos:7:calFin_input', '04/01/2022');
            formData.append('formularioConsultar:btBuscarAvanzada', 'Submit');
            console.log(formData);
            options.body = formData;
            options.redirect = 'follow';
            options.method = 'POST';

            //post the form
            return fetchCookie(form.action, options).then(async res => await res.text()).then(async body => {
                console.log('second fetch done');



                cheerioHelp(body, records);

            });


        });


    });
    console.log(options);

}

fetchHelper();
