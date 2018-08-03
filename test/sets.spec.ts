import {
    equals,
    intersect,
    intersectBy,
    intersection, intersectionBy,
    subtract,
    union,
    unique,
    unite,
    uniteBy,
    unionBy, subtractBy, uniqueBy,
} from '../src/arrays/sets';
import {equalOn, equalTo, sameOn} from "../src/predicates";


/**
 * intersection
 * intersectionBy
 * intersect
 * intersectBy
 *
 * union
 * unionBy
 * unite
 * uniteBy
 *
 * unique
 * uniqueBy
 *
 * subtract
 * subtractBy
 *
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Sets/Arrays', () => {

        // intersection

        it('intersection',() =>
            expect(intersection([[1,2],[2,3],[2,4]]))
                .toEqual([2]));


        it('intersect - no intersection',() =>
            expect(intersection([[1,2],[3,4],[5,6]]))
                .toEqual([]));


        it('intersect - no intersection where only partial intersection',() =>
            expect(intersection([[1,2],[2,3],[3,4]]))
                .toEqual([]));


        it('intersect - empty array',() =>
            expect(intersection([]))
                .toEqual([]));


        // intersectionBy

        it('intersectionBy', () =>
            expect(intersectionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))
                .toEqual([{c: 'c'}]));


        // intersect

        it('intersect',() =>
            expect(intersect([1,2])([2,4]))
                .toEqual([2]));


        it('intersect - variadic',() =>
            expect(intersect([1,2],[2,5])([2,4]))
                .toEqual([2]));


        it('intersect - spread',() =>

            expect(intersect(...[[1,2],[2,5]])([2,4]))
                .toEqual([2]));


        // intersectBy

        it('intersectBy', () =>
            expect(intersectBy(equalTo)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))
                .toEqual([{c: 'c'}]));


        // union

        it('union ',() =>
            expect(union([[1, 2],[3, 4],[2, 4]]))
                .toEqual([1, 2, 3, 4]));


        // unionBy

        it('unionBy', () =>
            expect(unionBy(equalTo)<any>([[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))
                .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));


        // unite

        it('unite',() =>
            expect(unite([1, 2])([2, 4]))
                .toEqual([1, 2, 4]));


        it('unite - variadic ',() =>
            expect(unite([1, 2], [3, 4])([2, 4]))
                .toEqual([1, 2, 3, 4]));


        it('unite - spread ',() =>
            expect(unite(...[[1, 2], [3, 4]])([2, 4]))
                .toEqual([1, 2, 3, 4]));


        // uniteBy

        it('uniteBy', () =>
            expect(uniteBy(equalTo)<any>([{a: 'a'}, {c: 'c'}])([{c: 'c'}, {d: 'd'}]))
                    .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]));


        // unique

        it('unique', () =>
            expect(unique([1, 1, 7, 8, 7, 1]))
                .toEqual([1, 7, 8]));


        it('unique - of none', () =>
            expect(unique([]))
                .toEqual([]));


        // TODO implement
        /*
        it('unique - objects', () =>
            expect(
                unique('a')([{a: 1}, {a: 2}, {a: 1}])
            ).toEqual([{a: 1}, {a: 2}])
        );*/


        // uniqueBy

        it('uniqueBy', () =>
            expect(uniqueBy(equalTo)([{a: 'c'}, {a: 'c'}]))
                .toEqual([{a: 'c'}]));


        // subtract

        it('subtract', () =>
            expect(subtract([3, 4, 5])([1, 2, 3]))
                .toEqual([1, 2]));


        it('subtract - make unique', () =>
            expect(subtract([3, 4, 5])([1, 2, 3, 3, 4, 4, 1]))
                .toEqual([1, 2]));


        it('subtract - from empty list', () =>
            expect(subtract([3, 4, 5])([]))
                .toEqual([]));


        it('subtract - empty list', () =>
            expect(subtract<number>([])([1, 2, 3]))
                .toEqual([1, 2, 3]));


        it('subtract - no intersection', () =>

            expect(subtract([4, 5, 6])([1, 2, 3]))
                .toEqual([1, 2, 3]));


        it('subtract - no intersection, make unique', () =>
            expect(subtract([4, 5, 6])([1, 2, 3, 3, 2]))
                .toEqual([1, 2, 3]));


        it('subtract - variadic', () =>
            expect(subtract([1], [2, 4])([1, 2, 3, 3, 2, 4]))
                .toEqual([3]));


        it('subtract - spread', () =>
            expect(subtract(...[[2], [1, 4]])([1, 2, 3, 3, 2, 4]))
                .toEqual([3]));


        // subtractBy

        it('subtractBy', () =>
            expect(subtractBy(equalTo)<any>([{a: 'a'}])([{a: 'a'}, {c: 'c'}]))
                .toEqual([{c: 'c'}]));





        // -------------------------------------


        it('equals - comparator', () => {

            expect(
                equals([{a: 1}, {b: 2}], [{b: 2}, {a: 1}], equalTo)
            ).toEqual(true);

            expect(
                equals([{a: 1}], [{b: 2}, {a: 1}], equalTo)
            ).toEqual(false);
        });
    });
}