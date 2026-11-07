'use strict'

const test = require('brittle')

const Fac = require('../')

test('stores, reads, and drops cache entries', function (t) {
  const caller = { ctx: { root: '' } }
  const fac = new Fac(caller, { max: 2 }, {})

  t.teardown(() => fac.stop(() => {}))

  t.plan(7)

  fac.start((err) => {
    t.absent(err)

    fac.set('a', 1)
    fac.set('b', 2)
    t.is(fac.get('a'), 1)
    t.is(fac.peek('a'), 1)
    t.is(fac.peek('b'), 2)

    fac.remove('a')
    t.is(fac.get('a'), undefined)

    fac.clear()
    t.is(fac.get('b'), undefined)

    fac.stop((stopErr) => {
      t.absent(stopErr)
    })
  })
})
