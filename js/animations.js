class AnimationController {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.container = document.querySelector('.container');
    this.cursorInterval = null;
  }

  animateCursor() {
    if (!this.cursor) return;

    this.cursorInterval = setInterval(() => {
      this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }

  setupParallaxEffect() {
    if (!this.container) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      this.container.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    });
  }

  destroy() {
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
  }

  init() {
    this.animateCursor();
    this.setupParallaxEffect();
  }
}