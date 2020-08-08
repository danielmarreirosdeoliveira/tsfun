import {forEach} from '../../src/array'


/**
 * tsfun | forEach
 */
describe('forEach', () => {

    it('forEach', () => {

        let acc = 1
        const items = forEach((item: number) => {
            acc += item
        })([2, 4, 3])
        expect(items).toEqual([2, 4, 3])
        expect(acc).toEqual(10)
    })


    it('forEach with i', () => {

        let acc = 1
        forEach((item, i: number) => {
            acc += i
        })([2, 4, 3])
        expect(acc).toEqual(4)
    })
})