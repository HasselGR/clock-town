
import { setStorage, getStorage } from './lib/common'

let dropdown = document.getElementById('select')
var canvas = document.getElementById('canvas')
let digital = document.getElementById('clock')
let cleanClock = document.getElementById('clean')
var canvasNova = document.getElementById('nova')
let simpleClock = document.getElementById('clocksimple')
let precise = document.getElementById('timedate')
var ctx = canvas.getContext('2d')
var radius = canvas.height / 2
ctx.translate(radius, radius)
radius = radius * 0.90
drawClock()
setInterval(drawClock, 1000)



const showClock = (value) => {
  switch (value) {
    case 'regular':
      canvas.style.display = 'block'
      digital.style.display = 'none'
      precise.style.display = 'none'
      canvasNova.style.display = 'none'
      simpleClock.style.display = 'none'
      cleanClock.style.display = 'none'
      // browser.storage.local.set({ clock: 'regular' })
      setStorage('clock', 'regular')
      break
    case 'digital':
      digital.style.display = 'block'
      canvas.style.display = 'none'
      precise.style.display = 'none'
      canvasNova.style.display = 'none'
      simpleClock.style.display = 'none'
      cleanClock.style.display = 'none'
      // browser.storage.local.set({ clock: 'digital' })
      setStorage('clock', 'digital')
      break
    case 'precise':
      precise.style.display = 'block'
      canvas.style.display = 'none'
      digital.style.display = 'none'
      canvasNova.style.display = 'none'
      simpleClock.style.display = 'none'
      cleanClock.style.display = 'none'
      // browser.storage.local.set({ clock: 'precise' })
      setStorage('clock', 'precise')
      break
    case 'nova':
      canvasNova.style.display = 'block'
      canvas.style.display = 'none'
      precise.style.display = 'none'
      digital.style.display = 'none'
      simpleClock.style.display = 'none'
      cleanClock.style.display = 'none'
      // browser.storage.local.set({ clock: 'nova' })
      setStorage('clock', 'nova')
      break
    case 'simple':
      canvasNova.style.display = 'none'
      canvas.style.display = 'none'
      precise.style.display = 'none'
      digital.style.display = 'none'
      simpleClock.style.display = 'block'
      cleanClock.style.display = 'none'
      // browser.storage.local.set({ clock: 'simple' })
      setStorage('clock', 'simple')
      break
    case 'clean':
      canvas.style.display = 'none'
      digital.style.display = 'none'
      precise.style.display = 'none'
      canvasNova.style.display = 'none'
      simpleClock.style.display = 'none'
      cleanClock.style.display = 'block'
      // browser.storage.local.set({ clock: 'clean' })
      setStorage('clock', 'clean')
      break
  }
}

const init = async () => {
  const type = await getStorage('clock')
  showClock(type)
  dropdown.value = type
}


function drawClock() {
  drawFace(ctx, radius)
  drawNumbers(ctx, radius)
  drawTime(ctx, radius)
}

dropdown.addEventListener('change', () => { showClock(dropdown.value) })

function drawFace(ctx, radius) {
  var grad

  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()

  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
  grad.addColorStop(0, '#333')
  grad.addColorStop(0.5, 'white')
  grad.addColorStop(1, '#333')
  ctx.strokeStyle = grad
  ctx.lineWidth = radius * 0.1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
  ctx.fillStyle = '#333'
  ctx.fill()
}

function drawNumbers(ctx, radius) {
  var ang
  var num
  ctx.font = `${radius * 0.15}px arial`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.85)
    ctx.rotate(-ang)
    ctx.fillText(num.toString(), 0, 0)
    ctx.rotate(ang)
    ctx.translate(0, radius * 0.85)
    ctx.rotate(-ang)
  }
}

function drawTime(ctx, radius) {
  var now = new Date()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  // hour
  hour = hour % 12
  hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60))
  drawHand(ctx, hour, radius * 0.5, radius * 0.07)
  // minute
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
  drawHand(ctx, minute, radius * 0.8, radius * 0.07)
  // second
  second = (second * Math.PI / 30)
  drawHand(ctx, second, radius * 0.9, radius * 0.02)
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.moveTo(0, 0)
  ctx.rotate(pos)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-pos)
}
// NOVA CANVAS
var ctxNova = canvasNova.getContext('2d')

ctxNova.strokeStyle = '#00ffff'
ctxNova.lineWidth = 17
ctxNova.shadowBlur = 15
ctxNova.shadowColor = '#00ffff'

function degToRad(degree) {
  var factor = Math.PI / 180
  return degree * factor
}

function renderTime() {
  var now = new Date()
  var today = now.toDateString()
  var time = now.toLocaleTimeString()
  var hrs = now.getHours()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  var mil = now.getMilliseconds()
  var smoothsec = sec + (mil / 1000)
  var smoothmin = min + (smoothsec / 60)

  // Background
  let gradient = ctxNova.createRadialGradient(250, 250, 5, 250, 250, 300)
  gradient.addColorStop(0, '#03303a')
  gradient.addColorStop(1, 'black')
  ctxNova.fillStyle = gradient
  // ctxNova.fillStyle = 'rgba(00 ,00 , 00, 1)';
  ctxNova.fillRect(0, 0, 500, 500)
  // Hours
  ctxNova.beginPath()
  ctxNova.arc(250, 250, 200, degToRad(270), degToRad((hrs * 30) - 90))
  ctxNova.stroke()
  // Minutes
  ctxNova.beginPath()
  ctxNova.arc(250, 250, 170, degToRad(270), degToRad((smoothmin * 6) - 90))
  ctxNova.stroke()
  // Seconds
  ctxNova.beginPath()
  ctxNova.arc(250, 250, 140, degToRad(270), degToRad((smoothsec * 6) - 90))
  ctxNova.stroke()
  // Date
  ctxNova.font = '25px Helvetica'
  ctxNova.fillStyle = 'rgba(00, 255, 255, 1)'
  ctxNova.fillText(today, 175, 250)
  // Time
  ctxNova.font = '25px Helvetica Bold'
  ctxNova.fillStyle = 'rgba(00, 255, 255, 1)'
  ctxNova.fillText(`${time}:${mil}`, 175, 280)
}
setInterval(renderTime, 40)

// DIGITAL CLOCK

function updateTime(k) {
  if (k < 10) {
    return `0${k}`
  } else {
    return k
  }
}
function currentTime() {
  var date = new Date() /* creating object of Date class */
  var hour = date.getHours()
  var min = date.getMinutes()
  var sec = date.getSeconds()
  var midday = 'AM'
  midday = (hour >= 12) ? 'PM' : 'AM'
  hour = updateTime(hour)
  min = updateTime(min)
  sec = updateTime(sec)
  document.getElementById('clock').innerText = `${hour} : ${min} : ${sec}${midday}` /* adding time to the div */
  var t = setTimeout(function () { currentTime() }, 1000) /* setting timer */
}

// START CLOCK SCRIPT

Number.prototype.pad = function (n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r
}

function updateClock() {
  var now = new Date()
  var milli = now.getMilliseconds()
  var sec = now.getSeconds()
  var min = now.getMinutes()
  var hou = now.getHours()
  var mo = now.getMonth()
  var dy = now.getDate()
  var yr = now.getFullYear()
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var tags = ['mon', 'd', 'y', 'h', 'm', 's', 'mi']
  var corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli]
  for (var i = 0; i < tags.length; i++) { document.getElementById(tags[i]).firstChild.nodeValue = corr[i] }
  var t = setTimeout(function () { updateClock() }, 1)
}

// SIMPLE CLOCK
const secondHand = document.querySelector('.second-hand')
const minsHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate() {
  const now = new Date()

  const seconds = now.getSeconds()
  const secondsDegrees = ((seconds / 60) * 360) + 90
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`

  const mins = now.getMinutes()
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90
  minsHand.style.transform = `rotate(${minsDegrees}deg)`

  const hour = now.getHours()
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90
  hourHand.style.transform = `rotate(${hourDegrees}deg)`
}

setInterval(setDate, 1000)

// MINIMALIST CLOCK

var inc = 1000

clock()

function clock() {
  const date = new Date()

  const hours = ((date.getHours() + 11) % 12 + 1)
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const hour = hours * 30
  const minute = minutes * 6
  const second = seconds * 6

  document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
  document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
  document.querySelector('.second').style.transform = `rotate(${second}deg)`
}

init()
setInterval(clock, inc)


setDate()


currentTime() /* calling currentTime() function to initiate the process */
updateClock()
