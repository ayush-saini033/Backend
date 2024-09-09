const EventEmitter = require('events');

// const event = require('events');

const event = new EventEmitter();

event.on("sayMyName", () => {
    console.log("your name is Ayush saini")
})

event.on("sayMyName", () => {
    console.log("your name is Anil saini")
})

event.on("sayMyName", () => {
    console.log("your name is Anuj saini")
})

event.on('checkpage', (sc,msg) => {
    console.log(`statuus code is ${sc} and the page is ${msg}`)
})

event.emit("sayMyName")

event.emit('checkpage', 200, 'ok')