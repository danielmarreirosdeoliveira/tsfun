import {intersect} from '../../src/set'
import {equal} from '../../src/comparator'


/**
 * tsfun | intersect
 */
describe('intersect', () => {

    it('array',() =>
        expect(

            intersect([1,2], [2,4]))

            .toEqual([2]))


    it('multiple arguments in single parameter list', () => {

        expect(

            intersect([1,2],[2,4],[2,3]))

            .toEqual([2])
    })


    it('multiple parameter lists', () => {

        expect(

            intersect([1,2])([2,4]))

            .toEqual([2])
    })


    it('typing', () => {

        const result1: number[] = intersect([1], [2])
        const result2: string[] = intersect(['1'], ['2'])

        const result4: (_: number[]) => number[] = intersect([1])
        const result5: (_: string[]) => string[] = intersect([''])

        const result7: number[] = intersect([1])([2])
        const result8: string[] = intersect(['1'])(['2'])

        const result10: number[] = intersect([1], [2], [3])
        const result11: string[] = intersect(['1'], ['2'], ['3'])
    })

    it('intersect with comparator', () =>
        expect(

            intersect<any>(equal, [{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{c: 'c'}]))

    // err cases

    it('illegal arguments', () => {

        expect(

            () => intersect()

        ).toThrow('illegal argument - intersect expects at least one argument in first parameter list')
    })
})
