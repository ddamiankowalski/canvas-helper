/**
 * Linear interpolation function
 * 
 * @param interpolated 
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 */
export const lerp = (
    interpolated: number, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number
): number => y1 + (interpolated - x1) * (y2 - y1) / (x2 - x1);