//Adapted from Frequent Time Update for HTML5 Video
//https://github.com/nathancahill/video-freqtimeupdate

// Polyfill from MDN for the CustomEvent constructor in IE9+
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

(function () {
  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})();

(async function (global) {
  global.CustomEvent('freqtimeupdate')
  'use strict'
  // Create the new `freqtimeupdate` event
  const freqtimeupdate = global.CustomEvent('freqtimeupdate'),

    // The event frequency in milliseconds
    frequency = 100,

    // Wrappers around setInterval and clearInterval to ensure one interval per audio
    setInterval = function () {
      this._interval = global.setInterval(intervalFunc.bind(this), frequency)
    },

    clearInterval = function () {
      global.clearInterval(this._interval)
      delete this._interval
    },

    // The actual interval function that dispatches the event
    intervalFunc = function () {
      this.dispatchEvent(freqtimeupdate)
    },

    // Get all audios from the page to add the event to
    audios = await global.document.getElementsByTagName('audio')
  // Add listeners to the audios for adding and removing the interval
  for (let i = 0; i < audios.length; i++) {
    if (!audios[i].paused) {
      setInterval.call(audios[i])
    }
    audios[i].addEventListener('play', setInterval)
    audios[i].addEventListener('playing', setInterval)
    audios[i].addEventListener('seeked', setInterval)

    audios[i].addEventListener('abort', clearInterval)
    audios[i].addEventListener('emptied', clearInterval)
    audios[i].addEventListener('ended', clearInterval)
    audios[i].addEventListener('pause', clearInterval)
  }
})(window)