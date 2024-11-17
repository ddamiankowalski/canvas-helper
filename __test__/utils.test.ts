import { lerp } from './../src/utils';

describe('utils', () => {
    describe('lerp', () => {
        it('interpolates 6 when (3, 4) and (6, 8)', () => {
            const value = lerp(6, 3, 4, 6, 8);
            expect(value).toBe(8)
        })

        it('interpolates 8 when (5, 3.5) and (10, 6)', () => {
            const value = lerp(8, 5, 3.5, 10, 6);
            expect(value).toBe(5)
        })
    })
})