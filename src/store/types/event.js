/**
 * @typedef {Object} Event
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {string} [category]
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} [venue]
 * @property {string} organizer
 * @property {string} [organization]
 * @property {boolean} isPublic
 * @property {any[]} [tickets]
 * @property {string[]} [staff]
 */

/**
 * @typedef {Object} EventPayload
 * @property {string} title
 * @property {string} [description]
 * @property {string} [category]
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} [venue]
 * @property {string} organizer
 * @property {string} [organization]
 * @property {boolean} [isPublic]
 */

/**
 * @typedef {Object} EventState
 * @property {Event[]} events
 * @property {Event|null} selectedEvent
 * @property {boolean} loading
 * @property {string|null} error
 */
