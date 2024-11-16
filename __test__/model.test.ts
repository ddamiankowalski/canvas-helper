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

    it('the render function is not called initially', () => {
        expect(renderFn).not.toHaveBeenCalled();
    })

    it('changing the model calls the render function', () => {
        const initial = { x: 0 };
        const model = createModel(initial, renderFn);
        model.x = 10;

        expect(renderFn).toHaveBeenCalledTimes(1);
    })

    it('changing the initial model does not call the render function', () => {
        const initial = { x: 0 };
        createModel(initial, renderFn);
        initial.x = 10;

        expect(renderFn).not.toHaveBeenCalled();
    })

    it('changing the model updates the initial object', () => {
        const initial = { x: 0 };
        const model = createModel(initial, renderFn);
        model.x = 10;

        expect(initial.x).toBe(10);
    })

    it('changing the initial object updates the model', () => {
        const initial = { x: 0 };
        const model = createModel(initial, renderFn);
        initial.x = 10;

        expect(model.x).toBe(10)
    })
})