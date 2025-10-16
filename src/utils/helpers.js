/**
 * Gets the date.
 *
 * @param {Date} [date=new Date()] The date (default: new Date())
 * @return {string} The date string.
 */
export const getDate = (date = new Date()) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, 0);
    const d = date.getDate().toString().padStart(2, 0);
    return `${y}-${m}-${d}`;
};

/**
 * Gets the time.
 *
 * @param {Date} [date=new Date()] The date (default: new Date())
 * @return {string} The time string.
 */
export const getTime = (date = new Date()) => {
    const h = date.getHours().toString().padStart(2, 0);
    const m = date.getMinutes().toString().padStart(2, 0);
    const s = date.getSeconds().toString().padStart(2, 0);
    return `${h}:${m}:${s}`;
};
