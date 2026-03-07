class AnimationController {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.container = document.querySelector('.container');
    this.cursorInterval = null;
    this.mouseMoveHandler = null;
  }

  animateCursor() {
    if (!this.cursor) return;

    this.cursorInterval = setInterval(() => {
      this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }

  setupParallaxEffect() {
    if (!this.container || window.innerWidth <= 768) return;

    this.mouseMoveHandler = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      this.container.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
    };

    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  destroy() {
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  init() {
    this.animateCursor();
    this.setupParallaxEffect();
  }
}
