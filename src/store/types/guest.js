/**
 * @typedef {Object} Guest
 * @property {string} _id
 * @property {string} name
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} eventId
 * @property {boolean} checkedIn
 * @property {string} [avatar]
 * @property {string} [role] - ex: VIP, Staff, etc.
 */

/**
 * @typedef {Object} GuestState
 * @property {Guest[]} guests
 * @property {boolean} loading
 * @property {string|null} error
 */
