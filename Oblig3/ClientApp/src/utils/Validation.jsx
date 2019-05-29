/**
 * Validates a category id based on a regular expression, validates if the number string is 
 * between the numbers 1-4.
 * @param {any} catId category id string.
 */
export function ValidCategory(catId) {
    const matchCategory = /^[1-4]{1}$/;
    if (matchCategory.test(catId)) {
        return true;
    } else {
        return false;
    }
}


/**
 * Validates a text input based on a regular expression, it matches a typical answer.
 * Returns true if match, else false.
 * @param {any} text string to match.
 */
export function ValidAnswer(text) {
    const matchAnswer = /^[A-ZÆØÅa-zæøå0-9,; /'".?!-]{11,1000}$/;
    if (matchAnswer.test(text)) {
        return true;
    } else {
        return false;
    }
}


/**
 * Validates a text input based on a regular expression, it matches a typical question.
 * Returns true if match, else false.
 * @param {any} text string to match.
 */
export function ValidQuestion(text) {
    const matchQuestion = /^[A-ZÆØÅa-zæøå0-9,; /'".?!-]{11,400}$/;
    if (matchQuestion.test(text)) {
        return true;
    } else {
        return false;
    }
}


/*
 * Solution for color coding more complete answers based on string length.
 * React Bootstrap. Source: 
 * https://react-bootstrap.github.io/components/forms/ (3.11.18)
*/
export function GetValidationState(text, maxLength) {
    const length = text.length;
    if (length > maxLength) return 'error';
    else if (length > 20) return 'success';
    else if (length > 10) return 'warning';
    else if (length > 0) return 'error';
    return null;
}