import {jsonEqual} from '../../src/comparator';
import {intersect, intersectBy, intersection, intersectionBy} from '../../src/arrayset';


/**
 * intersect and intersection are fast if used without specifying a comparator
 *
 * @author Daniel de Oliveira
 */
describe('intersection/intersect/intersectBy', () => {

    // intersection

    it('intersection - what remove duplicates',() =>
        expect(

            intersection([[1,2,2,3],[2,3,4,5]]))

            .toEqual([2,3]));


    it('intersection',() =>
        expect(

            intersection([[1,2],[2,3],[2,4]]))

            .toEqual([2]));


    it('intersect - no intersection',() =>
        expect(

            intersection([[1,2],[3,4],[5,6]]))

            .toEqual([]));


    it('intersect - no intersection where only partial intersection',() =>
        expect(

            intersection([[1,2],[2,3],[3,4]]))

            .toEqual([]));


    it('intersect - empty array',() =>
        expect(

            intersection([]))

            .toEqual([]));


    // intersectionBy

    it('intersectionBy', () =>
        expect(

            intersectionBy(jsonEqual)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{c: 'c'}]));


    // intersect

    it('intersect',() =>
        expect(

            intersect([1,2])([2,4]))

            .toEqual([2]));


    it('intersect - variadic',() =>
        expect(

            intersect([1,2],[2,5])([2,4]))

            .toEqual([2]));


    it('intersect - spread',() =>

        expect(

            intersect(...[[1,2],[2,5]])([2,4]))

            .toEqual([2]));


    // intersectBy

    it('intersectBy', () =>
        expect(

            intersectBy(jsonEqual)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))

            .toEqual([{c: 'c'}]));


    /**
     * x_max = 30, y_max = 10000
     * -> ~25ms
     *
     * Should be in the order of magnitude of 10 to 100,
     */
    it('intersection performance', () => {

        const aas = [];

        for (let x = 0; x < 30; x ++) {
            const as = [];
            for (let y = 0; y < 10000; y++) {
                as.push((x + y).toString())
            }
            aas.push(as);
        }

        const begin = new Date();
        intersection(aas);
        const elapsed = (new Date() as any) - (begin as any);
        if (elapsed > 100) fail();
    });
});
