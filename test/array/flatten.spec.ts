import {flatten} from '../../src/array'
import {flow} from '../../src/composition'
import {map} from '../../src/associative'
import {Associative} from '../../src/type'


/**
 * tsfun | flatten
 */
describe('flatten', () => {

    it('1 level', () => {

        // with a single argument list and implicit argument
        expect(

            flatten([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4])

        // with a single argument list and explicit argument
        expect(

            flatten([[1, 2], [3, 4]], 1)

        ).toEqual([1, 2, 3, 4])


        // with a single argument list and explicit argument in different order
        expect(

            flatten(1, [[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4])


        // or multiple argument lists
        expect(

            flatten(1)([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4])


        // in the latter case an empty arg list means flatten by 1 level
        expect(

            flatten()([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4])
    })


    it('1 level flattening in compositions', () => {

        // plays nicely with other higher order functions like 'map' in compositions
        expect(

            flow([3, 4]
            , map(_ => [_ * 2, _ * 3])
            , flatten()
            )

        ).toEqual([6, 9, 8, 12])
        expect(

            flow([3, 4]
            , map(_ => [_ * 2, _ * 3])
            , flatten()            // or with
            )

        ).toEqual([6, 9, 8, 12])

        // of which only the latter will give us the correct type

        const result13: Associative<number[]>
            = flow([3, 4]
            , map(_ => [_ * 2, _ * 3]) // this gives Associative
        )

        const result14: number[]
            = flow([3, 4]
            , map(_ => [_ * 2, _ * 3]) // this gives Associative
            , flatten()                // which flatten happily takes,
            // and with the parentheses the type gets correctly inferred
        )
    })


    it('1 - level of multiple', () => {

        expect(

            flatten(1)([[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, [2, 3], 4, [5, [6, 7]]])

        expect(

            flatten()([[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, [2, 3], 4, [5, [6, 7]]])

        expect(

            flatten(1, [[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, [2, 3], 4, [5, [6, 7]]])

        expect(

            flatten([[1, [2, 3]], [4, [5, [6, 7]]]], 1)

        ).toEqual([1, [2, 3], 4, [5, [6, 7]]])
    })


    it('2 - levels', () => {

        expect(

            flatten(2)([[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, 2, 3, 4, 5, [6, 7]])

        expect(

            flatten(2, [[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, 2, 3, 4, 5, [6, 7]])

        expect(

            flatten([[1, [2, 3]], [4, [5, [6, 7]]]], 2)

        ).toEqual([1, 2, 3, 4, 5, [6, 7]])
    })


    it('3 - levels', () => {

        expect(

            flatten(3)([[1, [2, [3, 4]]], [5, [6, [7, 8]]]])

        ).toEqual([1, 2, 3, 4, 5, 6, 7, 8])


        expect(

            flatten([[1, [2, [3, 4]]], [5, [6, [7, 8]]]], 3)

        ).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    })


    it('1 - level - but not level to compress - implicitly', () => {

        expect(

            flatten([1, 2] as any)

        ).toEqual([1, 2])


        expect(

            flatten(1, [1, 2] as any)

        ).toEqual([1, 2])


        expect(

            flatten(1)([1, 2] as any)

        ).toEqual([1, 2])
    })


    it('2 - level - but not level to compress', () => {

        expect(

            flatten([1, 2], 2)

        ).toEqual([1, 2])
    })


    it('typing', () => {

        // in the 1 level flattening case, we can easily infer the return type
        const result1: number[] = flatten()([[1, 2], [3, 4]])
        // const result: number = flatten()([[1, 2], [3, 4]]) // NOPE
        // const result: string[] = flatten()([[1, 2], [3, 4]]) // NOPE
        const result2: number[] = flatten(1)([[1, 2], [3, 4]])
        // const result: number = flatten(1)([[1, 2], [3, 4]]) // NOPE
        // const result: string[] = flatten(1)([[1, 2], [3, 4]]) // NOPE
        const result3: number[] = flatten([[1, 2], [3, 4]], 1)
        // const result: number = flatten([[1, 2], [3, 4]], 1) // NOPE
        // const result: string[] = flatten([[1, 2], [3, 4]], 1) // NOPE
        const result4: number[] = flatten(1, [[1, 2], [3, 4]])
        // const result: number = flatten(1, [[1, 2], [3, 4]]) // NOPE
        // const result: string[] = flatten(1, [[1, 2], [3, 4]], 1) // NOPE

        // const result5: number[] = flatten({a: [1, 2], b: [3, 4]})
        // const result6: number[] = flatten()({a: [1, 2], b: [3, 4]})
        // const result7: number[] = flatten(1)({a: [1, 2], b: [3, 4]})
        // const result8: number[] = flatten({a: [1, 2], b: [3, 4]}, 1)
        // const result9: number[] = flatten(1, {a: [1, 2], b: [3, 4]})
        // const result: string[] = flatten({a: [1, 2], b: [3, 4]}) // NOPE
        // const result: number = flatten({a: [1, 2], b: [3, 4]}) // NOPE
        // const result: number[] = flatten(2)({a: [1, 2], b: [3, 4]}) // NOPE
        // const result: number[] = flatten({a: [1, 2], b: [3, 4]}, 2) // NOPE
        // const result: number[] = flatten(2, {a: [1, 2], b: [3, 4]}) // NOPE

        // from two levels onwards, will only infer any[]
        const result10: any[] = flatten([[1]], 2)
        // const result: string[] = flatten([[1]], 2) // NOPE

        const result11: number[] = flatten(2,
            [
                [[1,2], [2,4]],
                [[1,2], [1,2]]
            ]
        )
        // const result: string[] = flatten(2, // NOPE
        //     [
        //         [[1,2], [2,4]],
        //         [[1,2], [1,2]]
        //     ]
        // )
        const result12: number[] = flatten(3,
            [
                [[[1,2],[1,2]], [[1,2],[1,2]]],
                [[[1,2],[1,2]], [[1,2],[1,2]]]
            ]
        )
        // const result: string[] = flatten(3, // NOPE
        //     [
        //         [[[1,2],[1,2]], [[1,2],[1,2]]],
        //         [[[1,2],[1,2]], [[1,2],[1,2]]]
        //     ]
        // )
    })

    // err cases

    it('illegal arguments', () => {

        const expected = 'illegal argument in "tsfun|flatten"';

        expect(() => flatten(2 as any, 2 as any)).toThrow(expected)
        expect(() => flatten([] as any, [] as any)).toThrow(expected)
        expect(() => flatten()(1 as any)).toThrow(expected)
        expect(() => (flatten as any)(2, 2, 2)).toThrow(expected)
        expect(() => flatten(1 as any)(1 as any)).toThrow(expected)
        expect(() => flatten()(1 as any)).toThrow(expected)

        expect(() => flatten(0)([])).toThrow(expected)
        expect(() => flatten(0, [])).toThrow(expected)
        expect(() => flatten([], 0)).toThrow(expected)

        expect(() => flatten({} as any, 1)).toThrow(expected)
        expect(() => flatten(1 as any, {} as any)).toThrow(expected)
        expect(() => flatten(1)({} as any)).toThrow(expected)
        expect(() => flatten()({} as any)).toThrow(expected)
        expect(() => flatten()({} as any)).toThrow(expected)
    })
})
