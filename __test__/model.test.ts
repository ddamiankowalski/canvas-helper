import { createModel } from "../src/model"

describe('model', () => {
    const renderFn = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('successfully creates model', () => {
        const initial = {};
        const model = createModel(initial, renderFn);

        expect(model).toBeTruthy();
    })
})