export function isValid(value) {
  return value.length >= 10
}

export function createModal(title, content, trigger) {
  const modal = document.createElement('div')
  const body = document.querySelector('body')
  modal.classList.add('modal')
  modal.id = trigger
  modal.innerHTML = `
  <a href="#close" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-container" role="document">
      <div class="modal-header">
      <a href="#modal" class="btn btn-clear float-right" aria-label="Close"></a>
      <div class="modal-title h5">${title}</div>
      </div>
      <div class="modal-body">
        <div class="content">
        ${content}
      </div>
    </div>
  `
  body.prepend(modal)

  // console.log(modal)
}
