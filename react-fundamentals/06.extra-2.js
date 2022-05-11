import * as React from 'react'

function UsernameForm({ onSubmitUsername }) {
  const [error, setError] = React.useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const username = event.target.elements[0].value
    onSubmitUsername(username)
  }

  function handleChange(event) {
    const usernameInput = event.target.value
    const isValid = usernameInput === usernameInput.toLowerCase()
    setError(isValid ? null : 'Username must be lower case')
    document.querySelector('button').disabled = !isValid
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input">Username:</label>
        <input type="text" id="input" onChange={handleChange}/>
      </div>
      <button type="submit">Submit</button>
      <div style={{ color: 'red' }} role="alert">{error}</div>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App