const express = require('express')

const app = express()

function Rest (config) {}

module.exports = {
  Rest,
  async setup () {
    console.log('Init Api')
  }
}