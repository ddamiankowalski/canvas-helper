import { createHelper } from './../src/helper';

describe('helper', () => {
    let wrapper: HTMLElement;

    beforeEach(() => {
        wrapper = document.createElement('div');
    })

    it('successfully creates helper', () => {
        const model = { x: 0, y: 0 };
        const helper = createHelper(wrapper, model);

        expect(helper).toBeTruthy();
    })

    it('has reference to model', () => {
        const initial = { x: 0, y: 0 };
        const { model } = createHelper(wrapper, initial);

        expect(model).toBeTruthy();
        expect(model).toEqual(initial);
    })

    it('has reference to #setScene method', () => {
        const initial = { x: 0, y: 0 };
        const { setScene } = createHelper(wrapper, initial);

        expect(setScene).toBeTruthy();
    })
})