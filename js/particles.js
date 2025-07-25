class ParticleSystem {
  constructor(containerId, particleCount = 50) {
    this.container = document.getElementById(containerId);
    this.particleCount = particleCount;
  }

  createParticles() {
    if (!this.container) return;

    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Posição aleatória
      particle.style.left = Math.random() * 100 + '%';
      
      // Delay aleatório para animação
      particle.style.animationDelay = Math.random() * 8 + 's';
      
      // Duração aleatória
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
      
      this.container.appendChild(particle);
    }
  }

  init() {
    this.createParticles();
  }
}