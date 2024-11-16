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

    it('', () => {
        wrapper.style.width = Number(wrapper.style.width) + 1 + 'px';

        expect(true).toBeTruthy();
    })
})