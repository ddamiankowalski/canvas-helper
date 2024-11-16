import type { RenderScene } from "./render.js";

/**
 * Creates model for the canvas
 * 
 * @param target 
 * @returns 
 */
export const createModel = <T extends Record<string | symbol, any>>(target: T, render: RenderScene) => {
    const model = createProxy(target, render);
    return model;
}

/**
 * Creates a proxy object with rendering
 * 
 * @param target 
 * @param render 
 * @returns 
 */
const createProxy = <T extends Record<string | symbol, any>>(target: T, render: RenderScene): T => {
    const handler: ProxyHandler<T> = {
        set(target: T, prop: string, value: any): boolean {
            Reflect.set(target, prop, value);
            render();
            return true;
        },

        defineProperty() {
            throw new Error('MODEL_ERROR: Cannot delete object property');
        },
    }

    return new Proxy(target, handler);
}