import cheerio from 'cheerio'
import moment from 'moment'

const momentDate = (date) => {
  // convert 05 Dec 2022 to moment to iso format
  const momentDate = moment(date, 'DD MMM YYYY').format('YYYY-MM-DD')
  return momentDate
}

export default function cheerioHelper (html, posts) {
  const $ = cheerio.load(html)
  $('.post').each((index, element) => {
    // create an object to hold the post data
    const post = {}

    // find each p and map its key value pairs to an object
    $(element).find('p').map((index, element) => {
      // add key value pairs to the object post
      post[$(element).find('span').text().replace(':', '')] = $(element).find('span').remove() ? $(element).text().trim() : null
      return post
    }).get()

    // find date and convert to moment js and add to object post
    $(element).find('.date-delivered').map((index, element) => {
      // convert date to moment js to use iso format
      post[$(element).find('span').text().replace(':', '')] = momentDate($(element).find('span').remove() ? $(element).text() : null)
      return post
    }).get()
    // find the case number and add to object post
    $(element).find('.case-number').map((index, element) => {
      post[$(element).find('span').text().replace(':', '')] = $(element).find('span').remove() ? $(element).text() : null
      return post
    }).get()

    $(element).find('h2').map((index, element) => {
      post.title = $(element).text()
      return post
    }).get()

    $(element).find('a').map((index, element) => {
      post.link = $(element).attr('href')
      return post
    }).get()

    // add the post object to the posts array
    posts.push(post)
  })
}
