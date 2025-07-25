class BannerEffects {
  constructor() {
    this.codeContainer = document.getElementById('codeSymbols');
    this.symbols = [
      '{}', '[]', '()', '<>', '/>', '&&', '||', '=>', 
      '===', '!==', 'var', 'let', 'const', 'function', 
      'return', 'if', 'else', 'for', 'while', 'class', 
      'import', 'export'
    ];
    this.intervalId = null;
  }

  createCodeSymbols() {
    if (!this.codeContainer) return;

    this.intervalId = setInterval(() => {
      const symbol = document.createElement('span');
      symbol.classList.add('code-symbol');
      symbol.textContent = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      symbol.style.left = Math.random() * 90 + '%';
      symbol.style.fontSize = (Math.random() * 0.5 + 0.7) + 'rem';
      symbol.style.animationDuration = (Math.random() * 4 + 4) + 's';

      this.codeContainer.appendChild(symbol);

      // Remover símbolo após a animação
      setTimeout(() => {
        if (symbol.parentNode) {
          symbol.parentNode.removeChild(symbol);
        }
      }, 8000);
    }, 800);
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  init() {
    this.createCodeSymbols();
  }
}