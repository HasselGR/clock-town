import browser from 'webextension-polyfill'



browser.runtime.onInstalled.addListener(()=>{
  browser.storage.local.set({clock:'regular'})
})