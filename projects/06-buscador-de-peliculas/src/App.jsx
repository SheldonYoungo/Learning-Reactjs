import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'


// const API_URL = 'http://www.omdbapi.com/?apikey=4c230ba7&'

const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true) 

  useEffect(() => {
    if(isFirstInput.current) { // Comprueba si es el primer input del formulario
      isFirstInput.current = search === ''
      return
    }
    if(search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    } 

    if(search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if(search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return 
    }

    setError(null)
  }, [search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search')
      getMovies({search})
    }, 300)
  , [getMovies])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if(newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      
      <header>
      <h1>Buscador de peliculas</h1>

        <form className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query'  placeholder='Avengers, The Matrix, Star Wars'/>
            <input type="checkbox" onClick={handleSort} checked={sort} />
            <button type="submit">Search</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading 
          ? <p>Cargando...</p> 
          : <Movies movies={movies}/>
        }
      </main>
    </div>
    )
}

export default App
