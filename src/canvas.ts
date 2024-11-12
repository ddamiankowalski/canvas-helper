/**
 * Creates canvas helper instance
 * 
 * @param wrapper 
 * @returns 
 */
export const createHelper = (wrapper: HTMLElement)  => {
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    rescaleCanvas(canvas);

    const ctx = getContext(canvas);
    ctx.beginPath();
    ctx.arc(40, 40, 40, 0, 2 * Math.PI);
    ctx.stroke();
    return canvas;
}

/**
 * Rescales the canvas so it looks good on the larger devices
 * 
 * @param canvas 
 */
const rescaleCanvas = (canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const ctx = getContext(canvas);

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    ctx.scale(devicePixelRatio, devicePixelRatio);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
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