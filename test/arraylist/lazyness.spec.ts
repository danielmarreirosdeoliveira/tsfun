import {lFilter, lMap, lRange, lTake, lZip, materialize} from '../../src/arraylist';
import {flow} from '../../src/composition';


/**
 * @author Daniel de Oliveira
 */
describe('lMap / lFilter / lTake / materialize', () => {

    it('lMap', () =>
        expect(

            flow([1, 2, 3, 4, 5],
                lMap((_: number) => 2 * _),
                lFilter((_: number) => _ > 5),
                lTake(1),
                materialize))

            .toEqual([6]));





    it('lRange and lZip', () => {

        materialize(lZip(lRange(10), ['a', 'b', 'c']));
    });
});