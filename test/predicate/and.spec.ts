import {and, isNot} from '../../src/predicate'
import {gt, is, isnt} from '../../src/comparator'
import {filter} from '../../src/associative'


/**
 * tsfun | and
 */
describe('and', () => {

    it('true', () =>
       expect(

           and(is(3), isnt(4))(3)

       ).toBe(true))


    it('false', () =>
        expect(

            and(is(3), isnt(4))(4)

        ).toBe(false))


    it('three args', () =>
        expect(

            and(is(3), isnt(4), isnt(5))(6)

        ).toBe(false))


    // use case

    it('use case', () =>
        expect(

            filter(
                and(
                    gt(1),
                    isNot(gt(4))))([1, 2, 3, 4, 5])

        ).toEqual([2, 3, 4]))
})
