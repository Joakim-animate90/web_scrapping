import cheerio from 'cheerio'
import moment from 'moment'

// eslint-disable-next-line no-unused-vars
const momentDate = (date) => {
  // convert  03/12/2022' to moment to iso format
  const momentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
  return momentDate
}

export function cheerioViewStateRemoveHiddenJurisPrudencia (html) {
  let viewState
  // Extract the value of the javax.faces.ViewState field using cheerio
  const $ = cheerio.load(html)
  // find a class .ui-layout-unit-content ui-widget-content using cheerio

  $('.ui-layout-unit-content.ui-widget-content').each((index, element) => {
    // find input field with name javax.faces.ViewState
    $(element).find('input').each((index, element) => {
      // remove the input attribute type hidden
      $(element).removeAttr('type')

      if ($(element).attr('name') === 'javax.faces.ViewState') {
        viewState = $(element).attr('value')
      }
    })
  })
  return viewState
}
export function cheerioViewStateRemoveHiddenAvazanda (html) {
  let viewState
  // Extract the value of the javax.faces.ViewState field using cheerio
  const $ = cheerio.load(html)
  // find a form id formularioConsultar using cheerio
  $('#formularioConsultar').each((index, element) => {
    // find input field with name javax.faces.ViewState
    $(element).find('input').each((index, element) => {
      // remove the input attribute type hidden
      $(element).removeAttr('type')
      if ($(element).attr('name') === 'javax.faces.ViewState') {
        viewState = $(element).attr('value')
      }
    })
  })
  return viewState
}
