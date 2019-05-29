/**
 * Getter for all the categories with all the associated questions, in the database.
 */
export function GetCategories() {
    let categories = fetch('api/FAQ/GetCategories')
        .then(response => response.json())
        .then(response => { return response; })
        .catch(error => {
            console.log("Nettverksproblemer: " + error);
        })

    return categories;
}

/**
 * Putter for a questions answer.
 * @param {any} id question id.
 * @param {any} answer questions answer.
 */
export function PutQuestionsAnswer(id, answer) {
    const answerQuestion = {
        Answer: answer
    }

    const url = 'api/FAQ/PutQuestionsAnswer/' + id;
    let question = fetch(url, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({ ...answerQuestion })
    }).then(response => response.json())
      .then(response => { return response; })
      .catch(error => {
          console.log("Nettverksproblemer: " + error);
      })

    return question;
}

/**
 * Posting a question to the database. The question does not contain a answer.
 * @param {any} catId category index to post question to.
 * @param {any} title the questions title ie. the question.
 */
export function PostQuestion(catId, title) {
    const createQuestion = {
        Title: title,
        CategoryId: catId
    }

    const url = 'api/FAQ/PostQuestion';
    let question = fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ ...createQuestion })
        })
        .then(response => response.json())
        .then(response => { return response; })
        .catch(error => {
            console.log("Nettverksproblemer: " + error);
        })

    return question;
}

/**
 * Putter for a questions rating.
 * @param {any} id question id
 * @param {any} add the rate to add to the quesions rating
 */
export function PutRating(id, add) {
    const rater = {
        Rate: add
    }

    let question = fetch('api/FAQ/PutRating/' + id, {
        method: 'PUT',
        body: JSON.stringify({ ...rater }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(response => { return response; })
      .catch(error => {
          console.log("Nettverksproblemer: " + error);
      })

    return question;
}