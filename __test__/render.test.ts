import { createScene } from './../src/render';
describe('render', () => {
    let ctx: CanvasRenderingContext2D;

    beforeEach(() => {
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
    })
})