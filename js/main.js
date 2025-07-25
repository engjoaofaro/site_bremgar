class Portfolio {
  constructor() {
    this.components = {
      particleSystem: new ParticleSystem('particles'),
      bannerEffects: new BannerEffects(),
      treeBuilder: new TreeBuilder(),
      animationController: new AnimationController()
    };
  }

  init() {
    // Inicializar todos os componentes
    Object.values(this.components).forEach(component => {
      if (component && typeof component.init === 'function') {
        component.init();
      }
    });

    // Log para debug (opcional)
    console.log('Portfolio inicializado com sucesso!');
  }

  destroy() {
    // Limpar recursos se necessário
    Object.values(this.components).forEach(component => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio();
  portfolio.init();

  // Cleanup quando a página for fechada (opcional)
  window.addEventListener('beforeunload', () => {
    portfolio.destroy();
  });
});