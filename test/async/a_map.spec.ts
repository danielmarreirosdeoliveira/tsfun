import {Map, Mapping} from '../../src/type'
import {aMap,aFlow} from '../../src/async'
import {map} from '../../src/associative'


/**
 * tsfun | aMap
 *
 * Asynchronous map for mapping over Associative
 */
describe('aMap', () => {

    it('async map over associative', async done => {

        // Works for Arrays
        expect(

            await aMap(delayedTimes2, [1, 2])

        ).toEqual([2, 4])

        // and for Maps
        expect(

            await aMap(delayedTimes2, {a: 1, b: 2})

        ).toEqual({a: 2, b: 4})


        // Arguments can also be given in reverse order

        expect(

            await aMap([1, 2], delayedTimes2)

        ).toEqual([2, 4])

        expect(

            await aMap({a: 1, b: 2}, delayedTimes2)

        ).toEqual({a: 2, b: 4})


        // Like the synchronous version of map, it passes the keys as second
        // argument to f. In case of maps those are strings, of course

        expect(

            await aMap([1, 2], async (_, i) => i)

        ).toEqual([0, 1])

        expect(

            await aMap({a: 1, b: 2}, async (_, k) => k)

        ).toEqual({a: 'a', b: 'b'})

        done()
    })


    it('usage with flow', async done => {

        expect(

            await aFlow([1, 2]
                , aMap(delayedTimes2)
                , map(times2)
                , delay
                , aMap(delayedTimes2))

            // Note that asynchronous as well a synchronous functions can be mixed and matched

        ).toEqual([8,16])

        done()
    })


    it('multiple param lists for use in composition', async done => {

        const $1 = await (await /* ! */ aMap(delayedTimes2))([1, 2])

        // As a standalone that does not look very good, but is necesarry for the map overload to work
        // In a composition, however, it works just fine (compare last example)

        expect($1).toEqual([2, 4])
        done()
    })


    const doubleArray: Mapping<number[], Promise<number[]>> =
        _ => aMap(delayedTimes2, _) // we have to use the single arg list version here since we cant use await to unpack the promise


    it('make an aMapping', async done => {

        expect(

            await doubleArray([1, 2])

        ).toEqual([2, 4])

        done()
    })


    it('typing', async done => {

        // like 'map' from 'tsfun/associative', in the case of a single
        // argument list, the box types are inferred as expected
        const result1: Array<number> = await aMap(delayedTimes2, [1, 2])
        const result2: Map<number> = await aMap(delayedTimes2, {a: 1, b: 2})

        // the multi argument list case
        // also gives us the correct box types,
        // in contrast to usage of 'associative/map'
        // in 'flow' and 'composition' of 'tsfun',
        // which gives Associative. There we want to simplify compositions
        // of Associatives (in addition to there being
        // restrictions of type inference between parameter lists)
        // in a context where typing is checked in compositions
        const result3: Array<number> = await (await aMap(delayedTimes2))([1, 2])
        const result4: Map<number> = await (await aMap(delayedTimes2))({a: 1, b: 2})

        // whereas here everything is typed to any, for reasons of simplicity.
        await aFlow( // gives us just Promise<any>
            [1,2],
            aMap(delayedTimes2)) // not typechecked

        done()
    })


    const times2 =
        _ => _ * 2

    const delayedTimes2 =
        _ => new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50))

    const delay =
        _ => new Promise<any>(resolve => setTimeout(() => resolve(_), 50))
})
