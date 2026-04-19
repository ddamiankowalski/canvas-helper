export class CavnvasHelper {
  private _canvas = document.createElement('canvas');

  constructor(private _wrapper: HTMLElement) {
    console.log('I am helper!', this._wrapper);
    this._resize();
  }

  get wrapper(): HTMLElement {
    return this._wrapper;
  }

  get ctx(): CanvasRenderingContext2D {
    const ctx = this._canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not retrieve context');
    }

    return ctx;
  }

  private _resize(): void {
    const wrapper = this.wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this._canvas.style.width = wrapper.width + 'px';
    this._canvas.style.height = wrapper.height + 'px';

    this._canvas.width = Math.round(wrapper.width * dpr);
    this._canvas.height = Math.round(wrapper.height * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
