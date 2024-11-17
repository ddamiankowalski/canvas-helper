import { createHelper } from './../src/helper';

describe('helper', () => {
    let wrapper: HTMLElement;

    let observeFn = jest.fn();
    let callback: (entries: ResizeObserverEntry[]) => void;

    beforeEach(() => {
        wrapper = document.createElement('div');

        global.ResizeObserver = jest.fn().mockImplementation((cb) => {
          callback = cb;

          return {
            observe: observeFn,
            unobserve: jest.fn(),
            disconnect: jest.fn(),
          };
        });
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

    it('has reference to context', () => {
        const { ctx } = createHelper(wrapper, {});
        expect(ctx).toBeTruthy();
    })

    it('has reference to #setScene method', () => {
        const initial = { x: 0, y: 0 };
        const { setScene } = createHelper(wrapper, initial);

        expect(setScene).toBeTruthy();
    })

    it('throws when #getContext returns null', () => {
        HTMLCanvasElement.prototype.getContext = () => null;
        expect(() => createHelper(wrapper, {})).toThrow('HELPER_ERROR: Could not get canvas 2d context');
    })

    it('observe function has been called on #ResizeObserver', () => {
        createHelper(wrapper, {});
        
        expect(observeFn).toHaveBeenCalledTimes(1);
        expect(observeFn).toHaveBeenCalledWith(wrapper);
    })

    it('observe function has been called ', () => {
        const { ctx } = createHelper(wrapper, {});
        global.devicePixelRatio = 2;

        wrapper.style.width = '10px';
        wrapper.style.height = '10px';
        
        callback([{} as any]);

        expect(ctx.scale).toHaveBeenCalledTimes(1);
        expect(ctx.scale).toHaveBeenCalledWith(2, 2);
    })
})