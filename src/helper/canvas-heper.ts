export class CavnvasHelper {
  /**
   * Canvas element
   */
  private _canvas: HTMLCanvasElement;

  /**
   * Observer of the wrapper element
   */
  private _observer: ResizeObserver;

  private _model = {
    x: 0,
    y: 0,
  };

  constructor(private _wrapper: HTMLElement) {
    this._canvas = this._createCanvas();
    this._observer = this._observeSize();

    this._onWindowResize();

    requestAnimationFrame(this._tick);
  }

  private _tick = () => {
    this._model = {
      x: this._model.x + 1,
      y: this._model.y + 1,
    };

    this._draw();
    requestAnimationFrame(this._tick);
  };

  get observer(): ResizeObserver {
    return this._observer;
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

  public draw(): void {
    this._draw();
  }

  private _onWindowResize(): void {
    window.addEventListener('resize', () => this._resize());
  }

  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    this._wrapper.appendChild(canvas);

    return canvas;
  }

  private _observeSize(): ResizeObserver {
    const observer = new ResizeObserver((entries) => {
      const [entry] = entries;
      const sizes = entry.devicePixelContentBoxSize;

      if (sizes && sizes.length) {
        const { inlineSize, blockSize } = sizes[0];

        this._resizeDevice(inlineSize, blockSize);
        this._draw();
        return;
      }

      const rect = entry.contentRect;
      this._resize(rect.width, rect.height);
      this._draw();
    });

    observer.observe(this._wrapper);
    return observer;
  }

  private _resizeDevice(width: number, height: number): void {
    const dpr = window.devicePixelRatio || 1;

    this._canvas.width = width;
    this._canvas.height = height;

    this._canvas.style.width = `${width / dpr}px`;
    this._canvas.style.height = `${height / dpr}px`;
    this._canvas.style.display = 'block';

    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  private _resize(
    width = this._wrapper.getBoundingClientRect().width,
    height = this._wrapper.getBoundingClientRect().height,
  ): void {
    const dpr = window.devicePixelRatio || 1;

    const pixelW = Math.round(width * dpr);
    const pixelH = Math.round(height * dpr);

    this._canvas.width = pixelW;
    this._canvas.height = pixelH;

    const ctx = this.ctx;

    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;
    this._canvas.style.display = 'block';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  private _draw(): void {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, this._canvas.width / dpr, this._canvas.height / dpr);

    this._renderCheck();
  }

  private _renderCheck(tileSize = 10): void {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    const width = this._canvas.width / dpr;
    const height = this._canvas.height / dpr;

    const cols = Math.ceil(width / tileSize);
    const rows = Math.ceil(height / tileSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        ctx.fillStyle = (row + col) % 2 === 0 ? 'red' : 'blue';

        const { x, y } = this._model;
        ctx.fillRect(
          ((col * tileSize + x) % parseFloat(this._canvas.style.width)) - 5,
          ((row * tileSize + y) % parseFloat(this._canvas.style.height)) - 5,
          tileSize,
          tileSize,
        );
      }
    }
  }
}
