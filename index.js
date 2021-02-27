const flatten = require('flat')
const { dset } = require('dset')
const isUrl = require('is-url-superb')

class StrapiCdnUrlRewrite {
  constructor(storageUrl = process.env.STORAGE_ENDPOINT, cdnUrl = process.env.CDN_ENDPOINT) {
    if (
      storageUrl &&
      typeof storageUrl === 'string' &&
      isUrl(storageUrl) &&
      cdnUrl &&
      typeof cdnUrl === 'string' &&
      isUrl(cdnUrl)
    ) {
      this.storage = storageUrl
      this.cdn = cdnUrl
    } else {
      throw new Error('`storageUrl` and `cdnUrl` must be valid URL strings')
    }
  }

  cdnRewrite = data => {
    try {
      const flattened = flatten(data)

      let matches = []
      for (let prop in flattened) {
        if (typeof flattened[prop] == 'string' && flattened[prop].includes(this.storage)) {
          matches.push({
            prop,
            value: flattened[prop].replace(this.storage, this.cdn)
          })
        }
      }

      matches.forEach(match => dset(data, match.prop, match.value))
      return data
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = StrapiCdnUrlRewrite
