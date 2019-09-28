import {arrayEquivalent, by, is, jsonEqual, on} from '../../src/comparator';
import {empty, isArray, isDefined, isEmpty, isNot, isUndefined, undefinedOrEmpty} from '../../src/predicate';
import {intersectBy} from '../../src/arrayset';


/**
 * Used for ObjectStructs in Arrays
 *
 * @author Daniel de Oliveira
 */
describe('on (by)', () => {


    it('array - first level', () =>
        expect(

            on('[1]', is(7))([4, 7]))

            .toEqual(true));


    it('array - second level', () =>
        expect(

            on('[1][1]', is(7))([3, [2, 7]]))

            .toEqual(true));


    it('object - first level',() =>
        expect(

            on('a', is(3))({ a: 3 }))

            .toEqual(true));


    it('object - second level',() =>
        expect(

            on('a.b', is(3))({ a: { b: 3 }}))

            .toEqual(true));


    it('first level object - second level array',() =>
        expect(

            on('a[1]', is(3))({ a: [7, 3]}))

            .toEqual(true));


    it('first level array - second level object',() =>
        expect(

            on('[1].a', is(15))([7, { a: 15 }]))

            .toEqual(true));


    it('first level object - second level object - third level array',() =>
        expect(

            on('a.b[1]', is(3))({ a: { b: [7, 3]}}))

            .toEqual(true));


    it('first level array - second level array - third level object',() =>
        expect(

            on('[1][1].a', is(3))([ 0, [ 3, { a: 3 }]]))

            .toEqual(true));


    it('first level array - second level object - third level object',() =>
        expect(

            on('[1].a[1]', is(3))([ 0, { a: [1, 3] }]))

            .toEqual(true));


    it('first level object - second level array - third level object',() =>
        expect(

            on('a[1].a', is(3))({ a: [1, { a: 3 }]}))

            .toEqual(true));


    it('unknown object key', () =>
        expect(

            on('a.b', is(15))({ c: { a: 1 }}))

            .toEqual(false));


    // resiliency

    it('unknown array key', () =>
        expect(

            on('[10].a', is(15))([7, 19, { a: 3 }]))

            .toEqual(false));


    it('collection is undefined', () =>
        expect(

            on('a', is(15))(undefined))

            .toEqual(false));

    // err cases

    it('unknown array key', () =>
        expect(

            () => on('[10].a', is(15))({ a: 'b' }))

            .toThrow());

    // use cases

    it('on - with find - symmetric',() =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .find(on('a.b')({a: {b: 5}})))

            .toEqual({a: {b: 5}} as any));


    it('on - with filter and isNot - symmetric', () =>
        expect(

            [{a: {b: 4}}, {a: {b: 5}}]
                .filter(isNot(on('a.b')({a: {b: 5}}))))

            .toEqual([{a: {b: 4}} as any]));



    it('on - with intersectBy - symmetric',() =>
        expect(

            intersectBy(on('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
            ([{a: {b: 5}}]))

            .toEqual([{a: {b: 5}} as any]));


    it('on - with find - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on('a.b', isUndefined))

        ).toEqual([{a: {c: 5}}] as any));


    it('on - with find and isNot - isUndefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(isNot(on('a.b', isUndefined)))

        ).toEqual([{a: {b: 4}}] as any));


    it('on - with find - isDefined predicate', () =>
        expect(

            [{a: {b: 4}}, {a: {c: 5}}]
                .filter(on('a.b', isDefined))

        ).toEqual([{a: {b: 4}}] as any));


    it('on - with find - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(on('a', isEmpty))

        ).toEqual([{a: []}] as any));


    it('on - with find and isNot - isEmpty predicate', () =>
        expect(

            [{a: [1, 2, 4]}, {a: []}]
                .filter(isNot(on('a', empty)))

        ).toEqual([{a: [1, 2, 4]}] as any));


    it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
        expect(

            [{a: [1, 2, 4]}, {a: undefined}]
                .filter(isNot(on('a', undefinedOrEmpty)))

        ).toEqual([{a: [1, 2, 4]}] as any));


    // it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
    //     expect(
    //
    //         [{a: [1, 2, 4]}, {b: undefined}] <- make that work with path not matching
    //             .filter(isNot(on('a')(isUndefinedOrEmpty)))
    //
    //     ).toEqual([{a: [1, 2, 4]}] as any));


    // it('on - with find and isNot - partial arrayEquivalent as predicate, without path match', () =>
    //     expect(
    //
    //         [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
    //             .filter(on('a.b:', arrayEquivalent)([1, 2]))
    //
    //     ).toEqual([{a: {b: [2, 1]}}] as any));


    it('on - with find and isArray', () =>
        expect(

            [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                .filter(on('a.b', isArray))

        ).toEqual([{a: {b: [2, 1]}}] as any));



    // onBy

    it('on - with find and isNot - user arrayEquivalent with By when you want ot match path', () =>
        expect(

            [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                .filter(on('a.b', arrayEquivalent)({a: {b: [1, 2]}}))

        ).toEqual([{a: {b: [2, 1]}}] as any));


    it('intersectBy onBy equalTo - symmetric',() =>
        expect(

            intersectBy(on('a.b', by(jsonEqual)))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
            ([{a: {b: {c: 'e'}}}]))

            .toEqual([{a: {b: {c: 'e'}}} as any]));


    // it('find onBy equalTo - exact',() =>
    //     expect(
    //
    //         [{a: {b: 4}}, {a: {b: 5}}]
    //             .find(on('a.b:', jsonEqual)(5)))
    //
    //         .toEqual({a: {b: 5}} as any));


    it('find onBy equalTo - symmetric',() =>
        expect(

            [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                .find(on('a.b', jsonEqual)({a: {b: {c: 4}}})))

            .toEqual({a: {b: {c: 4}}} as any));
});