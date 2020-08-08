import {remove as asyncRemove} from '../../../src/async'


/**
 * tsfun/async | remove
 *
 * asynchronous function for removing items from Collection by a given predicate
 */
describe('asyncRemove', () => {

    it('array - single param list', async done => {

        expect(

            await asyncRemove([2, 4, 3], delayedSmaller4))

            .toEqual([4])

        done()
    })


    it('array - single param list, different order', async done => {

        expect(

            await asyncRemove(delayedSmaller4, [2, 4, 3]))

            .toEqual([4])

        done()
    })


    it('array', async done => {

        expect(

            await (await asyncRemove(delayedSmaller4))([2, 4, 3]))

            .toEqual([4])

        done()
    })


    it('object', async done => {

        expect(

            await (await asyncRemove(delayedSmaller4))({a: 2, b: 4, c: 3}))

            .toEqual({ b: 4 })

        done()
    })


    it('array with i', async done => {

        expect(

            await (await asyncRemove((_: any, i: number) => Promise.resolve(i === 1)))([2, 4, 3]))

            .toEqual([2, 3])

        done()
    })


    it('object with k', async done => {

        expect(

            await (await asyncRemove((_: any, k: string) => Promise.resolve(k === 'b')))({a: 2, b: 4, c: 3}))

            .toEqual({ a: 2, c: 3 })

        done()
    })


    it('string', async done => {

        expect(

            await (await asyncRemove((a: string) => Promise.resolve(a > 'a')))('abde'))

            .toEqual('a')

        done()
    })


    // typing - see comments in asyncMap typing test
})



const delayedSmaller4 =
    _ => new Promise<any>(resolve => setTimeout(() => resolve(_ < 4), 50))