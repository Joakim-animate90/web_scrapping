import fetch from 'node-fetch'
import makeFetchCookie from 'fetch-cookie'
import { cheerioViewStateRemoveHiddenJurisPrudencia, cheerioViewStateRemoveHiddenAvazanda } from './cheerioHelp.js'
import { javaxPartialAjax, javaxPartialExecute, javaxPartialSource, javaxViewState } from './constants.js'

const fetchCookie = makeFetchCookie(fetch)
const baseUrl = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/'
let cookies = ''
export default async function fetchHelper () {
  const options = {
    method: 'GET',
    headers: {

    }
  }

  const formData = new URLSearchParams()
  const formDataAvazanda = new URLSearchParams()

  await fetchCookie(baseUrl, options).then(res => res).then(async body1 => {
    console.log(body1.status)
    // check if response involves set-cookie header
    if (body1.headers.get('set-cookie')) {
      // Store the new cookie(s) in a variable
      const newCookies = body1.headers.get('Set-Cookie')

      // update the new cookie(s) to the cookies variable
      cookies += newCookies
    }

    const viewState = cheerioViewStateRemoveHiddenJurisPrudencia(await body1.text())

    formData.append('formularioConsultar:corporaciones:2:j_idt142', 'formularioConsultar:corporaciones:2:j_idt142')
    formData.append(javaxViewState, viewState)
    formData.append('j_idt35', 'j_idt35')
    formData.append(javaxPartialAjax, 'true')
    formData.append(javaxPartialSource, 'formularioConsultar:corporaciones:2:j_idt142')
    formData.append(javaxPartialExecute, 'formularioConsultar:corporaciones:2:j_idt142')

    options.method = 'POST'
    options.body = formData
    options.headers.Referer = baseUrl
    options.headers.Cookie = cookies

    return fetchCookie(`${baseUrl}faces/consulta/SeleccionCorporacion.xhtml`, options)
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
        options.headers.Referer = `${baseUrl}/faces/consulta/SeleccionCorporacion.xhtml`

        return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`)
      }).then(res => res).then(async body => {
        console.log(await body.text())
        // check if response involves set-cookie header
        if (body.headers.get('set-cookie')) {
          // Store the new cookie(s) in a variable
          const newCookies = body.headers.get('Set-Cookie')

          // update the new cookie(s) to the cookies variable
          cookies += newCookies
        }
        const viewState = cheerioViewStateRemoveHiddenAvazanda(await body.text())

        formDataAvazanda.append(javaxPartialAjax, 'true')
        formDataAvazanda.append(javaxPartialSource, 'formularioConsultar:j_idt33')
        formDataAvazanda.append(javaxPartialExecute, '@all')
        formDataAvazanda.append('formularioConsultar:j_idt33', 'formularioConsultar:j_idt33')
        formDataAvazanda.append(javaxViewState, viewState)
        formDataAvazanda.append('activeIndex', '1')
        formDataAvazanda.append('formularioConsultar:tvConsulta_activeIndex', '0')

        options.method = 'POST'
        options.body = formDataAvazanda
        options.headers.Cookie = cookies
        options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
        return fetchCookie(`${baseUrl}/faces/consulta/ConsultaCorporacion.xhtml`, options)
          .then(res => res).then(async body => {

            console.log(await body.text())
          })
      })
  })
}
fetchHelper()
