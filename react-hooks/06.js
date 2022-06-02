// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallBack ({ error }) {
  return (
    <div role='alert'>
      There was an error: {' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo ({ pokemonName }) {
  const [state, setState] = React.useState({ status: 'idle', pokemon: null })
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (pokemonName === '') return

    setState({ status: 'pending', pokemon: null })
    setError(null)

    fetchPokemon(pokemonName).then(
      pokemonData => setState({ status: 'resolved', pokemon: pokemonData }),
      error => {
        setState({ status: 'rejected', pokemon: null })
        setError(error)
      }
    )
  }, [pokemonName])

  let basicPokemonElem
  switch (state.status) {
    case 'idle':
      basicPokemonElem = 'Submit a pokemon'
      break

    case 'pending':
      basicPokemonElem = <PokemonInfoFallback name={pokemonName} />
      break

    case 'resolved':
      basicPokemonElem = <PokemonDataView pokemon={state.pokemon} />
      break

    case 'rejected':
      throw error

    default:
  }

  return (
    <>
      <div>status: {state.status}</div><br />
      {basicPokemonElem}
    </>
  )
}

function App () {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit (newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className='pokemon-info-app'>
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className='pokemon-info'>
        <ErrorBoundary
          FallbackComponent={ErrorFallBack}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
