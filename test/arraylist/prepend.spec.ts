import {prepend} from '../../src/arraylist';


describe('prepend', () => {

    it('prepend', () =>

        expect(

            prepend(1, 2)([3, 4]))

            .toEqual([1, 2, 3, 4]));


    it('string', () =>

        expect(

            prepend('g', 'h')('mno'))

            .toEqual('ghmno'));
});
