import { type IDraw } from "./draw.js";
import { createScene } from "./scene.js";

/**
 * Creates canvas helper instance
 * 
 * @param wrapper 
 * @returns 
 */
export const createHelper = (wrapper: HTMLElement)  => {
    const canvas = document.createElement('canvas');
    const ctx = getContext(canvas);

    const { renderScene, setScene } = createScene(ctx);

    rescaleCanvas(canvas, wrapper, renderScene);
    wrapper.appendChild(canvas);

    return {
        setScene
    }
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
        throw new Error('Could not get canvas 2d context');
    }

    return ctx;
}