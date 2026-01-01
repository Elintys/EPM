/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} name
 * @property {string} [description]
 * @property {string} [icon]
 * @property {string} [color]
 */

/**
 * @typedef {Object} CategoryState
 * @property {Category[]} categories
 * @property {Event[]} eventsByCategory
 * @property {string|null} selectedCategory
 * @property {boolean} loading
 * @property {string|null} error
 */
