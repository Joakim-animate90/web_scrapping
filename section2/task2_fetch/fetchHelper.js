import fetch from 'node-fetch'
import makeFetchCookie from 'fetch-cookie'
import {
  cheerioViewStateRemoveHiddenJurisPrudencia,
  cheerioViewStateRemoveHiddenAvazanda
} from './cheerioHelp.js'
import {
  javaxPartialAjax, javaxPartialBehaviorEvent,
  javaxPartialEvent,
  javaxPartialExecute, javaxPartialRender,
  javaxPartialSource,
  javaxViewState
} from './constants.js'

const fetchCookie = makeFetchCookie(fetch)
const baseUrl = 'https://ratioiurisprudentia.ramajudicial.gov.co/Jurisprudencia/'
let cookies = ''

export default async function fetchHelper () {
  const options = {
    method: 'GET',
    headers: {

    }
  }

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
    const formData = new URLSearchParams()
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
        options.headers.Referer = `${baseUrl}faces/consulta/SeleccionCorporacion.xhtml`

        return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`)
      }).then(res => res).then(async body => {
        // check if response involves set-cookie header
        if (body.headers.get('set-cookie')) {
          // Store the new cookie(s) in a variable
          const newCookies = body.headers.get('Set-Cookie')

          // update the new cookie(s) to the cookies variable
          cookies += newCookies
        }
        const viewState = cheerioViewStateRemoveHiddenAvazanda(await body.text())
        const formData = new URLSearchParams()
        formData.append(javaxPartialAjax, 'true')
        formData.append(javaxPartialSource, 'formularioConsultar:j_idt33')
        formData.append(javaxPartialExecute, '@all')
        formData.append('formularioConsultar:j_idt33', 'formularioConsultar:j_idt33')
        formData.append(javaxViewState, viewState)
        formData.append('activeIndex', '1')
        formData.append('formularioConsultar:tvConsulta_activeIndex', '0')

        options.method = 'POST'
        options.body = formData
        options.headers.Cookie = cookies
        options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
        return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
          .then(res => res, viewState).then(async body => {
            console.log('i am heeeeeeeeeeeeeeeeere')
            // check if response involves set-cookie header
            if (body.headers.get('set-cookie')) {
              // Store the new cookie(s) in a variable
              const newCookies = body.headers.get('Set-Cookie')

              // update the new cookie(s) to the cookies variable
              cookies += newCookies
            }

            const formData = new URLSearchParams()
            formData.append(javaxViewState, viewState)
            formData.append(javaxPartialAjax, 'true')
            formData.append(javaxPartialSource, 'formularioConsultar:tvConsulta')
            formData.append(javaxPartialExecute, 'formularioConsultar:tvConsulta')
            formData.append(javaxPartialEvent, 'tabChange')
            formData.append(javaxPartialBehaviorEvent, 'tabChange')
            formData.append('formularioConsultar:tvConsulta_tabindex', '1')
            formData.append('formularioConsultar', 'formularioConsultar')
            formData.append('formularioConsultar:tvConsulta_newTab', 'formularioConsultar:tabAvnzd')

            options.method = 'POST'
            options.body = formData
            options.headers.Cookie = cookies
            options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
            return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
              .then(res => res).then(async body => {
                // pass res1 to the next then block

                // cheerioRemoveReadonlyFechaInicial(await body.text())
                // check if response involves set-cookie header
                if (body.headers.get('set-cookie')) {
                  // Store the new cookie(s) in a variable
                  const newCookies = body.headers.get('Set-Cookie')

                  // update the new cookie(s) to the cookies variable
                  cookies += newCookies
                }
                const formData = new URLSearchParams()
                formData.append(javaxViewState, viewState)
                formData.append('formularioConsultar:dtCampos:7:calInicio_input', '03/12/2022')
                formData.append(javaxPartialAjax, 'true')
                formData.append(javaxPartialSource, 'formularioConsultar:dtCampos:7:calInicio')
                formData.append(javaxPartialExecute, 'formularioConsultar:dtCampos:7:calInicio')
                formData.append(javaxPartialRender, 'formularioConsultar:dtCampos:7:calFin')
                formData.append(javaxPartialEvent, 'dateSelect')
                formData.append(javaxPartialBehaviorEvent, 'dateSelect')

                options.method = 'POST'
                options.body = formData
                options.headers.Cookie = cookies
                options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
                return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
                  .then(res => res).then(async body => {
                    // get res1 from the previous then block and convert it to text

                    // check if response involves set-cookie header
                    if (body.headers.get('set-cookie')) {
                      // Store the new cookie(s) in a variable
                      const newCookies = body.headers.get('Set-Cookie')

                      // update the new cookie(s) to the cookies variable
                      cookies += newCookies
                    }
                    const formData = new URLSearchParams()
                    formData.append(javaxViewState, viewState)
                    formData.append('formularioConsultar:dtCampos:7:calFin_input', '04/12/2022')
                    formData.append(javaxPartialAjax, 'true')
                    formData.append(javaxPartialSource, 'formularioConsultar:dtCampos:7:calFin')
                    formData.append(javaxPartialExecute, 'formularioConsultar:dtCampos:7:calFin')
                    formData.append(javaxPartialBehaviorEvent, 'dateSelect')
                    formData.append(javaxPartialEvent, 'dateSelect')

                    options.method = 'POST'
                    options.body = formData
                    options.headers.Cookie = cookies
                    options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
                    return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
                      .then(res => res).then(async body => {
                        // check if response involves set-cookie header
                        if (body.headers.get('set-cookie')) {
                          // Store the new cookie(s) in a variable
                          const newCookies = body.headers.get('Set-Cookie')

                          // update the new cookie(s) to the cookies variable
                          cookies += newCookies
                        }
                        const formData = new URLSearchParams()
                        formData.append(javaxViewState, viewState)
                        formData.append(javaxPartialSource, 'formularioConsultar:btBuscarAvanzada')
                        formData.append(javaxPartialExecute, 'formularioConsultar:btBuscarAvanzada')
                        formData.append(javaxPartialAjax, 'true')
                        formData.append(javaxPartialBehaviorEvent, 'click')
                        formData.append(javaxPartialEvent, 'click')
                        formData.append(javaxPartialRender, 'formularioConsultar:panel')

                        options.method = 'POST'
                        options.body = formData
                        options.headers.Cookie = cookies
                        options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
                        return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
                          .then(res => res).then(async body => {
                            console.log(await body.text())
                            // check if response involves set-cookie header
                            if (body.headers.get('set-cookie')) {
                              // Store the new cookie(s) in a variable
                              const newCookies = body.headers.get('Set-Cookie')

                              // update the new cookie(s) to the cookies variable
                              cookies += newCookies
                            }
                            const formData = new URLSearchParams()
                            formData.append(javaxViewState, viewState)
                            formData.append(javaxPartialSource, 'formularioConsultar:btBuscarAvanzada')
                            formData.append(javaxPartialExecute, '@all')
                            formData.append(javaxPartialAjax, 'true')

                            options.method = 'POST'
                            options.body = formData
                            options.headers.Cookie = cookies
                            options.headers.Referer = `${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`
                            return fetchCookie(`${baseUrl}faces/consulta/ConsultaCorporacion.xhtml`, options)
                              .then(res => res).then(async body => {
                                console.log('Reached the end of the chain')

                                console.log(await body.text())
                              })
                          })
                      })
                  })
              })
          })
      })
  })
}
fetchHelper()
