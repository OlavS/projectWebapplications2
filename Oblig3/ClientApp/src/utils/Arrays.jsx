/**
 * Getter for the index of a entry in a array containing ids.
 * @param {any} array the array to find the index in.
 * @param {any} id the id to find.
 */
export function GetIndexWithId(array, id) {
    return array.findIndex(c => c.id === parseInt(id, 10));
}