import {aReduce} from '../../src/async';


/**
 * tsfun | aReduce
 */
describe('aReduce', () => {

    it('array - single parameter list', async done => {

        const sum = await aReduce(delayedAdd, 0, [1, 3, 7])

        expect(sum).toBe(11)
        done()
    })


    it('array - single parameter list, collection at first position', async done => {

        const sum = await aReduce([1, 3, 7], delayedAdd, 0)

        expect(sum).toBe(11)
        done()
    })


    it('array - multiple parameter lists', async done => {

        const asyncSum = await aReduce(delayedAdd, 0)

        const sum = await asyncSum([1, 3, 7])
        expect(sum).toBe(11)
        done()
    })


    it('object', async done => {

        expect(
            await (await aReduce((acc: string, b: string, k: string) => Promise.resolve(acc + b + k), '.'))({
                a: '3',
                b: '7',
                c: '5'
            }))
            .toBe('.3a7b5c')
        done()
    })


    const delayedAdd =
        (acc, val) => new Promise<any>(resolve => setTimeout(() => resolve(acc + val), 150))
})
