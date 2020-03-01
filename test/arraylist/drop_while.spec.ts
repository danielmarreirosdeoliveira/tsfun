import {isnt, lessThan} from '../../src/comparator';
import {dropWhile} from '../../src/arraylist';


describe('drop', () => {

    it('drop five', () =>

        expect(

            dropWhile(lessThan(20))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([21, 20])
    );


    it('drop none', () =>

        expect(

            dropWhile(lessThan(5))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([7, 9, 10, 13, 21, 20])
    );


    it('empty', () =>

        expect(

            dropWhile(lessThan(20))
            ([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            dropWhile(isnt('a'))
            ('ddefabc')

        ).toEqual('abc')
    );
});
