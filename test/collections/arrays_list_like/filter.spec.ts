import {flow} from '../../../src/flow';
import {smallerThan} from '../../../src/comparators';
import {filter} from '../../../src/collections/arrays_list_like';


describe('Arrays/List-Like-Collection/filter', () => {


    // filter

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(smallerThan(4))))

            .toEqual([2, 3]));


});
