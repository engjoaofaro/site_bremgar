class TreeBuilder {
  constructor() {
    this.treeElement = document.querySelector('.tree-structure');
    this.treeData = {
      'feature_projects/': {
        'web-development/': {
          'static-sites/': {
            'bremgar-site': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/site_bremgar'
            },
          },
        },
        'data_analysis/': {
          'cases_datacamp/': {
            'netflix_case': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/netflix_case_datacamp'
            },
            'nyc_schools_case': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/nyc_public_school_case_datacamp'
            }
          },
          'python-scripts/': {
            'data-analysis': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/loterias-app-core'
            }
          }
        },
        'web-app/': {
          'java/': {
            'loterias-app-v2': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/loterias-app-v2'
            },
            'scheduler-app': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/scheduler-webapp'
            }
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

      // Verifica se é um link
      if (children.type === 'link') {
        result += `${prefix}${connector}<a href="${children.url}" target="_blank" class="tree-link">${name}</a>\n`;
      } else {
        result += prefix + connector + name + '\n';
      }

      // Remove a propriedade 'type' e 'url' antes de verificar se há filhos
      const childrenWithoutMeta = { ...children };
      delete childrenWithoutMeta.type;
      delete childrenWithoutMeta.url;

      if (Object.keys(childrenWithoutMeta).length > 0) {
        result += this.buildTree(childrenWithoutMeta, childPrefix);
      }
    });

    return result;
  }

  render() {
    if (!this.treeElement) return;

    const treeString = this.buildTree(this.treeData);
    this.treeElement.innerHTML = treeString; // Mudou de textContent para innerHTML para suportar HTML
  }

  init() {
    this.render();
  }
}