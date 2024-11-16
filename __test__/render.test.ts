import { createScene } from './../src/render';

describe('render', () => {
    let ctx: CanvasRenderingContext2D;

    beforeEach(() => {
        jest.clearAllMocks();
        global.requestAnimationFrame = jest.fn();

        const canvas = document.createElement('canvas');
        const c = canvas.getContext('2d');
        if(!c) {
            throw new Error('Could not get context');
        }

        ctx = c;
    })
    
    it('successfully creates scene', () => {
        const { renderScene, setScene } = createScene(ctx);

        expect(renderScene).toBeTruthy();
        expect(setScene).toBeTruthy();
    });

    it('initially the RAF function is not called', () => {
        const { renderScene } = createScene(ctx);
        renderScene();

        expect(requestAnimationFrame).not.toHaveBeenCalled();
    })

    it('RAF is called after #setScene was called', () => {
        const { renderScene, setScene } = createScene(ctx);
        
        setScene(() => {});
        renderScene();

        expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    })

    describe('RAF', () => {
        const stepFn = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
            jest.useFakeTimers();

            global.requestAnimationFrame = (callback: FrameRequestCallback) => {
               setTimeout(() => {
                callback(0);

               }, 100);
               return 0;
            }
        })

        it('calls the step fn (render function) inside RAF', () => {
            const { renderScene, setScene } = createScene(ctx);
        
            setScene(stepFn);
            renderScene();
            jest.runOnlyPendingTimers();

            expect(stepFn).toHaveBeenCalledTimes(1)
        })

        it('does not call the step fn (render function) twice inside RAF', () => {
            const { renderScene, setScene } = createScene(ctx);
        
            setScene(stepFn);
            renderScene();
            renderScene();
            renderScene();
            jest.runOnlyPendingTimers();

            expect(stepFn).toHaveBeenCalledTimes(1)
        })
    })
})