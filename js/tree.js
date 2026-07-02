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
          'saas-platforms/': {
            'beautyops': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/beautyops'
            },
            '100porcentojogos-site': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/100porcentojogos-site'
            },
            'iracing-tmp': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/iracing-tmp'
            },
            'loterias-sim-web': {
              type: 'link',
              url: 'https://github.com/engjoaofaro/loterias-sim-web'
            }
          },
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

  buildTree(data, prefix, fragment) {
    const entries = Object.entries(data);

    entries.forEach(([name, children], index) => {
      const isLastEntry = index === entries.length - 1;
      const connector = isLastEntry ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ';
      const childPrefix = prefix + (isLastEntry ? '    ' : '\u2502   ');

      if (children.type === 'link') {
        fragment.appendChild(document.createTextNode(prefix + connector));
        const link = document.createElement('a');
        link.href = children.url;
        link.target = '_blank';
        link.className = 'tree-link';
        link.textContent = name;
        fragment.appendChild(link);
        fragment.appendChild(document.createTextNode('\n'));
      } else {
        fragment.appendChild(document.createTextNode(prefix + connector + name + '\n'));
      }

      const childrenWithoutMeta = { ...children };
      delete childrenWithoutMeta.type;
      delete childrenWithoutMeta.url;

      if (Object.keys(childrenWithoutMeta).length > 0) {
        this.buildTree(childrenWithoutMeta, childPrefix, fragment);
      }
    });
  }

  render() {
    if (!this.treeElement) return;

    const fragment = document.createDocumentFragment();
    this.buildTree(this.treeData, '', fragment);
    this.treeElement.textContent = '';
    this.treeElement.appendChild(fragment);
  }

  init() {
    this.render();
  }
}
