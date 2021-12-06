const path = require('path');
const urlFilter = require('@11ty/eleventy/src/Filters/Url');

/**
 * Heuristic to detect if an URL needs an index file; either because it ends
 * with a slash, or its last component has no dots in it.
 *
 * @param {string} url 
 * @returns trailing `/index.html` if url looks like a directory.
 */
const indexify = url => url.replace(/(\/[^.]*)$/, '$1index.html');

/**
 * Just `{{ '/something' | url }}` will return the relative path to
 * `/something/index.html`.
 * 
 * `{{ '/something.with.dots' | url }}` will return the relative path to
 * `/something.with.dots`.
 * 
 * @param {string} url the URL to transform
 * @param {string} [pathPrefix] optional path prefix to force an absolute URL
 * @returns {string} resulting URL
 */
module.exports = function(url, pathPrefix = undefined) {
  if (pathPrefix !== undefined) {
    // Fall back on original url filter if pathPrefix is set.
    return urlFilter(url, pathPrefix);
  }

  // Look up the url of the current rendering page, which is accessible via
  // `this`.
  const currentDir = this.ctx.page.url;
  const filteredUrl = urlFilter(url, '/');

  // Make sure the index.html is expressed.
  const indexUrl = indexify(filteredUrl);

  // Check that the url doesn't specify a protocol.
  const u = new URL(indexUrl, 'make-relative://');
  if (u.protocol !== 'make-relative:') {
    // It has a protocol, so just return the filtered URL output.
    return filteredUrl;
  }

  // Return the relative path, or `index.html` if it's the same as the current
  // page's directory.
  const relativePath = `${path.relative(currentDir, u.pathname) || 'index.html'}`
  return relativePath;
};
