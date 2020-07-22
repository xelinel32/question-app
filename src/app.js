import { isValid, createModal } from './utils'
import { Question } from './question'
import { getAuthzForm, authWithEmailAndPassword } from './auth'
import '../node_modules/spectre.css/dist/spectre.css'
import '../node_modules/spectre.css/dist/spectre-icons.css'
import '../node_modules/spectre.css/dist/spectre-exp.css'
import './style.css'

const form = document.getElementById('form')
const input = form.querySelector('#questions')
const modalBtn = document.getElementById('modal-btn')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(e) {
  e.preventDefault()

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }
    submitBtn.disabled = true
    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = ''
      input.required = false
      submitBtn.disabled = false
    })
  }
}

function openModal() {
  createModal('Авторизация', getAuthzForm(), 'auth-modal')
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {
      once: true, // create event once
    })
}

function authFormHandler(e) {
  e.preventDefault()

  const btn = event.target.querySelector('button')
  const email = e.target.querySelector('#email').value
  const password = e.target.querySelector('#password').value

  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false))
}

function renderModalAfterAuth(content) {
  if (typeof content === 'strign') {
    createModal('Ошибка', content)
  } else {
    createModal('Список вопросов', Question.listToHtml(content))
  }
}
