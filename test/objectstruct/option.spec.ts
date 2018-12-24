import {jsonEqual, on, tripleEqual} from '../../src/comparator';
import {isEmpty} from '../../src/predicate';
import {flow} from '../../src/composition';
import {option, to} from '../../src/objectstruct';


/**
 * @author Daniel de Oliveira
 */
describe('option', () => {


    // option

    it('option', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                to('a.b'),
                option(on('c:')(4)),
                jsonEqual({c: 4})))

            .toEqual(true));


    it('to after failing option', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                option(on('a.b.c:')(5)),
                to('c'),
                tripleEqual(4)))

            .toEqual(false));


    it('option isEmpty', () =>
        expect(

            flow<any>({a:{b:{c: 4}}},
                option(on('c:')(5)),
                isEmpty))

            .toEqual(true));
});