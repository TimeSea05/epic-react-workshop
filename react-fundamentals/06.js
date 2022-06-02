import * as React from 'react'

function UsernameForm({ onSubmitUsername }) {
  const [username, setUsername] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const username = event.target.elements[0].value
    onSubmitUsername(username)
  }

  function handleChange(event) {
    const usernameInput = event.target.value
    setUsername(usernameInput.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input">Username:</label>
        <input type="text" id="input" value={username} onChange={handleChange}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App