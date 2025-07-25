class TreeBuilder {
  constructor() {
    this.treeElement = document.querySelector('.tree-structure');
    this.treeData = {
      'projetos/': {
        'web-development/': {
          'react-apps/': {
            'portfolio-site/': {},
            'e-commerce-platform/': {}
          },
          'vanilla-js/': {
            'interactive-components/': {}
          }
        },
        'backend/': {
          'node-apis/': {
            'auth-service/': {},
            'payment-gateway/': {}
          },
          'python-scripts/': {
            'data-analysis/': {}
          }
        },
        'mobile/': {
          'react-native/': {
            'fitness-tracker/': {}
          },
          'flutter/': {
            'expense-manager/': {}
          }
        }
      }
    };
  }

  buildTree(data, prefix = '') {
    let result = '';
    const entries = Object.entries(data);

    entries.forEach(([name, children], index) => {
      const isLastEntry = index === entries.length - 1;
      const connector = isLastEntry ? '└── ' : '├── ';
      const childPrefix = prefix + (isLastEntry ? '    ' : '│   ');

      result += prefix + connector + name + '\n';

      if (Object.keys(children).length > 0) {
        result += this.buildTree(children, childPrefix);
      }
    });

    return result;
  }

  render() {
    if (!this.treeElement) return;

    const treeString = this.buildTree(this.treeData);
    this.treeElement.textContent = treeString;
  }

  init() {
    this.render();
  }
}