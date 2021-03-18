const { flatten, unflatten } = require('safe-flat')
const isUrl = require('is-url-superb')

class StrapiCdnUrlRewrite {
  constructor(storageUrl, cdnUrl) {
    if (storageUrl && isUrl(storageUrl) && cdnUrl && isUrl(cdnUrl)) {
      this.storage = storageUrl
      this.cdn = cdnUrl
    } else if (
      process.env.CDN_ENDPOINT &&
      isUrl(process.env.CDN_ENDPOINT) &&
      process.env.STORAGE_ENDPOINT &&
      isUrl(process.env.STORAGE_ENDPOINT)
    ) {
      this.storage = process.env.STORAGE_ENDPOINT
      this.cdn = process.env.CDN_ENDPOINT
    } else {
      throw new Error('`storageUrl` and `cdnUrl` must be valid URLs')
    }
  }

  crawl = data => {
    const flattened = flatten(data)

    for (let prop in flattened) {
      if (typeof flattened[prop] === 'string' && flattened[prop].startsWith(this.storage)) {
        flattened[prop] = flattened[prop].replace(this.storage, this.cdn)
      }
    }

    return unflatten(flattened)
  }

  cdnRewrite = async data => {
    try {
      data = await data

      if (Array.isArray(data)) {
        let out = []

        for (let item of data) {
          out.push(this.crawl(await item))
        }

        return out
      } else {
        return this.crawl(data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = StrapiCdnUrlRewrite
