import {throws} from '../../src/composition';

/**
 * tsfun | throws
 *
 * @author Daniel de Oliveira
 */
describe('throws', () => {

   it('throws', () =>

       expect(

           () => throws('e')()

       ).toThrow('e')
   );


    it('throws - take second arg as msg if first undefined', () =>

        expect(

            () => throws()('e')

        ).toThrow('e')
    )
});