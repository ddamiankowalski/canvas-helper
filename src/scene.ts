import type { IDraw } from "./draw.js";
import { circle, clear } from './draw.js';

/**
 * Registers a callback for drawing a scene
 * 
 * @param callback 
 */
export const createScene = (ctx: CanvasRenderingContext2D) => {
    let renderStep: ((draw: IDraw) => void) | null = null; 

    const renderScene = () => {
        renderStep && renderStep({
            circle: circle(ctx),
            clear: clear(ctx)
        });
    }

    const setScene = (step: (draw: IDraw) => void) => {
        renderStep = step;
    }

    return {
        renderScene,
        setScene
    }
}