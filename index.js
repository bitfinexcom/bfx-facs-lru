'use strict'

const LRU = require('lru')
const Base = require('bfx-facs-base')

class LRU extends Base {
  constructor (caller, opts, ctx) {
    super(caller, opts, ctx)

    this.name = 'lru'
    this.init()
  }

  _start (cb) {
    async.series([
      next => { super._start(next) },
      next => {
        this.cache = new LRU(this.opts)
        next()
      }
    ], cb)
  }

  _stop (cb) {
    async.series([
      next => { super._stop(next) },
      next => {
        this.clear()
      }
    ], cb)
  }

  get (k) {
    return this.cache.get(k)
  }

  set (k, v) {
    return this.cache.set(k, v)
  }

  clear () {
    this.cache.clear()
  }
}

module.exports = LRU
