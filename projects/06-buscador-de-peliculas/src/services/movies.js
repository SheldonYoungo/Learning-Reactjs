const API_KEY = '4c230ba7'

export const searchMovies = ({search}) => {
    if(search === '') return null

    if(search) {
        return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
            .then(res => res.json())
            .then(json => {
                const movies = json.Search

                return movies?.map(movie => ({
                    id: movies.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster
                }))
            })
            .catch(() => {
                throw new Error('Error searching movies')
            })
    }
}