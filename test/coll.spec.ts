

import {copy} from '../src/coll';
/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Collections', () => {

        it('copy - array',() =>

            expect(

                copy([2,4])

            ).toEqual([2, 4])
        );


        it('copy - array, retain instance',() => {

            const instance = {a: 'hey'};

            expect(

                copy([instance, 4])[0]

            ).toBe(instance)
        });


        it('copy - object, keys mixed numbers and strings',() =>

            expect(

                copy({a: 1, 2: 2})

            ).toEqual({a: 1, 2: 2})
        );


        it('copy - object, retain instance',() => {

            const instance = {a: 'hey'};

            expect(

                copy({a: 1, 2: instance})[2]

            ).toBe(instance)
        });


        it('copy - retain existent keys with undefined properties',() =>

            expect(

                copy({a: 1, 2: undefined})

            ).toEqual({a: 1, 2: undefined})
        );
    });
}