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
})