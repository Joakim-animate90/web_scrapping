import fetch from 'node-fetch'
import makeFetchCookie from 'fetch-cookie'
import cheerioHelpRemoveTypeHidden from './cheerioHelp'

const fetchCookie = makeFetchCookie(fetch)
const url = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/'
let cookies = ''
export default async function fetchHelper () {
  const options = {
    method: 'GET',
    headers: {

    }
  }

  const formData = new URLSearchParams()

  await fetchCookie(url, options).then(res => res).then(async body1 => {
    console.log(body1.status)
    // check if response involves set-cookie header
    if (body1.headers.get('set-cookie')) {
      // Store the new cookie(s) in a variable
      const newCookies = body1.headers.get('Set-Cookie')

      // update the new cookie(s) to the cookies variable
      cookies += newCookies
    }

    const viewState = cheerioHelpRemoveTypeHidden(await body1.text())
    formData.append('formularioConsultar:corporaciones:2:j_idt142', 'formularioConsultar:corporaciones:2:j_idt142')
    formData.append('javax.faces.ViewState', viewState)
    formData.append('j_idt35', 'j_idt35')
    formData.append('javax.faces.partial.ajax', 'true')
    formData.append('javax.faces.source', 'formularioConsultar:corporaciones:2:j_idt142')
    formData.append('javax.faces.partial.execute', 'formularioConsultar:corporaciones:2:j_idt142')

    options.method = 'POST'
    options.body = formData
    options.headers.Referer = url
    options.headers.Cookie = cookies

    console.log(options)
    return fetchCookie('https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/faces/consulta/SeleccionCorporacion.xhtml', options)
      .then(res => res).then(async body => {
        // check if response involves set-cookie header
        if (body.headers.get('set-cookie')) {
          // Store the new cookie(s) in a variable
          const newCookies = body.headers.get('Set-Cookie')

          // update the new cookie(s) to the cookies variable
          cookies += newCookies
        }
        options.method = 'GET'
        options.body = null
        options.headers.Cookie = cookies
        options.headers.Referer = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/faces/consulta/SeleccionCorporacion.xhtml'
        return fetchCookie('https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/faces/consulta/ConsultaCorporacion.xhtml')
      }).then(res => res).then(async body => {
        // check if response involves set-cookie header
        if (body.headers.get('set-cookie')) {
          // Store the new cookie(s) in a variable
          const newCookies = body.headers.get('Set-Cookie')

          // update the new cookie(s) to the cookies variable
          cookies += newCookies
        }
      })

    // await fetchCookie(`https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/faces/consulta/ConsultaCorporacion.xhtml#javax.faces.ViewState=${viewState}`, options)
    //  .then(res => res).then(async body => console.log(await body.text()));
  })
}
fetchHelper()
