export class Question {
  static create(question) {
    return fetch('https://questions-app-888c4.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        response.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList())
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage()

    const html = questions.length
      ? questions.map(toCard).join('')
      : `<p>Вопросов пока еще нет!</p>`

    const list = document.querySelector('#list')
    list.innerHTML = html
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">You not have token</p>')
    }
    return fetch(
      `https://questions-app-888c4.firebaseio.com/questions.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((questions) => {
        if (questions.error) {
          return '<p class="error">Yor get error from respons</p>'
        }
        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : []
      })
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <li>
    <span>
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
    </span>
    <p>
      ${question.text}
    </p>
  </li>
  `
}
