# Bima Trading static catalog

Open `index.html` in a browser. No installation, build step, framework, external font, or server is required. For an optional local preview, run `python3 -m http.server 8000 --directory site` from the parent folder.

## Files

- `index.html`: homepage with all 18 collections and category search.
- `seating.html` through the other named category files: 18 standalone category pages, with product search when products are available.
- `contact.html`: email, telephone, and mailing address.
- `assets/style.css`: shared responsive styling.
- `assets/script.js`: category search and product rendering/search.
- `assets/products.js`: product data, grouped by category slug.
- `assets/images/`: 18 representative collection photos copied from the supplied legacy site. They illustrate categories, not current inventory.
- `CNAME`: `bimatrade.com`.
- `.nojekyll`: keeps GitHub Pages serving these files as plain static assets.

## Adding products

Replace each empty category array in `assets/products.js` with verified products. For example, this is an illustrative record, not actual inventory:

```js
"seating": [
  {
    sku: "EXAMPLE-001",
    name: "Example chair",
    width: 20,
    depth: 22,
    height: 36,
    image: "assets/images/products/example-001.jpg"
  }
]
```

SKU, name, width, depth, and height are the product fields. All dimensions are inches; numeric values, including decimals, are supported. An optional image path is relative to the category HTML page. Missing or failed images show a neutral placeholder. Missing dimensions show “Not provided,” and zero is preserved. Use exact category keys already present in the file, unique SKUs, and positive dimensions for production products. No HTML edits are required to add products. No sample products are published.

Navigation and category browsing work without JavaScript. Product rendering and search require JavaScript. Each category has a helpful empty state until data is added.

## GitHub Pages

1. Copy **the contents of this `site/` directory** to the root of a clean GitHub repository, including `.nojekyll` and `CNAME`.
2. In the repository's Settings → Pages, choose “Deploy from a branch,” your publishing branch, and `/ (root)`.
3. Set the custom domain to `bimatrade.com` and configure the domain's DNS for GitHub Pages. Enable HTTPS when GitHub makes it available.

Publish only the contents of `site/`. The parent directory contains legacy PHP, admin software, and database backups which are not part of this replacement.

Contact information was carried over from the supplied legacy `contact.php`: br@bimatrade.com, 617.359.8558, and PO Box 201, Westwood, MA 02090. Confirm those details before launch; the legacy footer used a different telephone number. The contact page uses email and telephone links, with no backend or pretend submission form.
