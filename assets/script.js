(() => {
  'use strict';
  const categorySearch = document.querySelector('#category-search');
  if (categorySearch) {
    const cards = [...document.querySelectorAll('.category-card')];
    document.querySelector('.collection-tools').hidden = false;
    categorySearch.addEventListener('input', () => {
      const query = categorySearch.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        card.hidden = !card.dataset.categoryName.includes(query);
        if (!card.hidden) visible++;
      });
      document.querySelector('#category-count').textContent = `${visible} ${visible === 1 ? 'collection' : 'collections'}`;
      document.querySelector('#no-categories').hidden = visible !== 0;
    });
  }

  const category = document.body.dataset.category;
  if (!category) return;
  const products = window.BIMA_PRODUCTS?.[category] || [];
  if (!products.length) return;
  const grid = document.querySelector('#product-grid');
  const search = document.querySelector('#product-search');
  document.querySelector('#catalog-empty').hidden = true;
  document.querySelector('.product-tools').hidden = false;

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function render(query = '') {
    const matches = products.filter(product => `${product.name} ${product.sku}`.toLowerCase().includes(query));
    grid.replaceChildren();
    matches.forEach(product => {
      const card = element('article', 'product-card');
      const placeholder = () => element('div', 'product-image product-image-placeholder', 'Image coming soon');
      if (product.image) {
        const img = element('img', 'product-image');
        img.alt = product.name;
        img.loading = 'lazy';
        img.width = 400;
        img.height = 340;
        img.addEventListener('error', () => img.replaceWith(placeholder()), { once: true });
        img.src = product.image;
        card.append(img);
      } else card.append(placeholder());
      card.append(element('h2', '', product.name), element('p', 'product-sku', `SKU: ${product.sku}`));
      const dimensions = element('dl', 'dimensions');
      [['Width', 'width'], ['Depth', 'depth'], ['Height', 'height']].forEach(([label, key]) => {
        const pair = element('div');
        const value = product[key];
        pair.append(element('dt', '', label), element('dd', '', value == null || value === '' ? 'Not provided' : `${value}″`));
        dimensions.append(pair);
      });
      card.append(dimensions);
      grid.append(card);
    });
    document.querySelector('#product-count').textContent = `${matches.length} ${matches.length === 1 ? 'product' : 'products'}`;
    document.querySelector('#no-products').hidden = matches.length !== 0;
  }
  search.addEventListener('input', () => render(search.value.trim().toLowerCase()));
  render();
})();
