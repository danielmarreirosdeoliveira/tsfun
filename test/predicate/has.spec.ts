import {has} from '../../src/predicate';

/**
 * tsfun | has
 *
 * @author Daniel de Oliveira
 */
describe('has', () => {

    it('true', () =>
        expect(

            has('a.b')({a: {b: 1}}))

            .toEqual(true));


    it('false', () =>
        expect(

            has('a.c')({a: {b: 1}}))

            .toEqual(false));
});