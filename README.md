# Welcome to strapi-cdn-url-rewrite 👋

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: self_agency](https://img.shields.io/twitter/follow/self_agency.svg?style=social)](https://twitter.com/self_agency)

Strapi controller module to rewrite upload URLs to CDN. Swaps out your bucket URLs for your CDN URLs in your response data.

## Install

```sh
yarn add strapi-cdn-url-rewrite
```

## Use

Add your storage and CDN endpoints to your `.env` file like so:

```bash
STORAGE_ENDPOINT=https://your-bucket.storage.com
CDN_ENDPOINT=https://your-bucket.cdn.com
```

(You can also pass them directly if you don't want to use environmental variables. See below.)

Open your collection or single type's controller file (eg., `./api/{COLLECTION}/controllers/${COLLECTION}.js`), and add the following, substituting your collection or single type's name in the place of `{COLLECTION}`:

```javascript
const StrapiCdnUrlRewrite = require('strapi-cdn-url-rewrite')

const { cdnRewrite } = new StrapiCdnUrlRewrite()

module.exports = {
  async find(ctx) {
    return cdnRewrite(await strapi.services.{COLLECTION}.find(ctx.query))
  },
  async findOne(ctx) {
    const { id } = ctx.params
    return cdnRewrite(await strapi.services.{COLLECTION}.findOne({ id }))
  }
}
```

### Full Parameters

```javascript
const { cdnRewrite } = StrapiCdnUrlRewrite(storageUrl, cdnUrl)
```

#### `storageUrl`

Valid URL string to your storage bucket. Eg., `https://your-bucket.s3.wasabisys.com`.

#### `cdnUrl`

Valid URL string for your CDN endpoint Eg., `https://your-bucket.b-cdn.com`.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/selfagency/strapi-cdn-url-rewrite).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
