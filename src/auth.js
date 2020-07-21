export function getAuthzForm() {
  return `
  <form class="mb-2" id="auth-form">
    <h3 class="text-warning">Задать вопрос</h3>
    <div class="form-group mb-2">
      <label class="form-label" for="email">Email</label>
      <input
        class="form-input s-rounded"
        type="email"
        id="email"
        required
      />
      <label class="form-label" for="passwor">Password</label>
      <input
        class="form-input s-rounded"
        type="password"
        id="password"
        required
      />
    </div>
    <button
      class="btn btn-success text-uppercase btn-lg"
      type="submit"
    >
      Login
    </button>
  </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const API_KEY = 'AIzaSyAaUwbzXJo3yHiqeT4zXG0f0eaoWMovNHA'
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken)
}
