module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:3000/"
  },
  testMatch: [
    "**/test/**/*.test.js"
  ],
  verbose: true
}