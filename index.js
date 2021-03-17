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

  cdnRewrite = async data => {
    try {
      const flattened = flatten(await flatten(data)['0'])

      for (let prop in flattened) {
        if (typeof flattened[prop] === 'string' && flattened[prop].startsWith(this.storage)) {
          flattened[prop] = flattened[prop].replace(this.storage, this.cdn)
        }
      }

      return unflatten(flattened)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = StrapiCdnUrlRewrite
