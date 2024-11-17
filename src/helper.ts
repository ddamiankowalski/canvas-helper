import { createEvent } from "./event.js";
import { createModel } from "./model.js";
import { createScene } from "./render.js";

/**
 * Creates canvas helper instance
 * 
 * @param wrapper 
 * @returns 
 */
export const createHelper = <T extends object>(wrapper: HTMLElement, initialModel: T)  => {
    const { canvas, ctx } = createCanvas(wrapper);

    const { renderScene, setScene } = createScene(ctx);
    rescaleCanvas(canvas, wrapper, renderScene);

    return {
        setScene,
        ctx,
        model: createModel(initialModel, renderScene),
        event: createEvent(wrapper)
    }
}

/**
 * Creates canvas
 * 
 * @param wrapper 
 * @returns 
 */
const createCanvas = (wrapper: HTMLElement) => {
    const canvas = document.createElement('canvas');
    const ctx = getContext(canvas);
    
    wrapper.appendChild(canvas);

    return { canvas, ctx };
}

/**
 * Rescales the canvas so it looks good on the larger devices
 * 
 * @param canvas 
 */
const rescaleCanvas = (
    canvas: HTMLCanvasElement, 
    wrapper: HTMLElement, 
    renderScene: () => void
) => {
    const ctx = getContext(canvas);

    const observer = new ResizeObserver(([entry]) => {
        if(!entry) {
            return;
        }
        
        const rect = wrapper.getBoundingClientRect();

        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
    
        ctx.scale(devicePixelRatio, devicePixelRatio);
    
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';

        renderScene();
    });

    observer.observe(wrapper);
}

/**
 * Retrieves the context
 * 
 * @param canvas 
 * @returns 
 */
const getContext = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if(!ctx) {
        throw new Error('HELPER_ERROR: Could not get canvas 2d context');
    }

    return ctx;
}