module.exports = {
  launch: {
    headless: true,
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    devtools: true
  }
}