import {Map} from '../../../src/type'
import {
    map as asyncMap /* use an alias if you want to disambiguate */,
    flow as asyncFlow
} from '../../../src/async'


/**
 * tsfun/async | map
 *
 * asynchronous map for mapping over Associative
 */
describe('asyncMap', () => {

    it('async map over associative', async done => {

        // mapping as usual, but with an async mapping function
        expect(

            await asyncMap(delayedTimes2, [1, 2])

        ).toEqual([2, 4])

        // works for Map, abstracting over Associative
        expect(

            await asyncMap(delayedTimes2, {a: 1, b: 2})

        ).toEqual({a: 2, b: 4})
        done()
    });


    it('multiple param lists for use in composition', async done => {

        expect(await asyncMap(delayedTimes2)([1, 2])).toEqual([2, 4])
        done()
    })


    it('typing', async done => {

        // like 'map' from 'tsfun/associative', in the case of a single
        // argument list, the box types are inferred as expected
        const result1: Array<number> = await asyncMap(delayedTimes2, [1, 2])
        const result2: Map<number> = await asyncMap(delayedTimes2, {a: 1, b: 2})

        // the multi argument list case
        // also gives us the correct box types,
        // in contrast to usage of 'associative/map'
        // in 'flow' and 'composition' of 'tsfun',
        // which gives Associative. There we want to simplify compositions
        // of Associatives (in addition to there being
        // restrictions of type inference between parameter lists)
        // in a context where typing is checked in compositions
        const result3: Array<number> = await asyncMap(delayedTimes2)([1, 2])
        const result4: Map<number> = await asyncMap(delayedTimes2)({a: 1, b: 2})

        // whereas here everything is typed to any, for reasons of simplicity.
        await asyncFlow( // gives us just Promise<any>
            [1,2],
            asyncMap(delayedTimes2)) // not typechecked

        done()
    })


    const delayedTimes2 =
        (_: number) => new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50))
})