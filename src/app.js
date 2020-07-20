import { isValid } from './utils'
import { Question } from './question'
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

function openModal() {}
