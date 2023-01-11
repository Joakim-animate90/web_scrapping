import fetch from 'node-fetch'

export default async function fetcher () {
  const response = await fetch('./section4/case.html')
  const html = await response.text()
  console.log(html)
  return html
}
