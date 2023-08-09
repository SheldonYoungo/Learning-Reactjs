import './App.css'
import { useCatFact } from "./hooks/useCatFact"
import { useCatImage } from './hooks/useCatImage.js'



export function App () {
    const {fact, refreshRandomFact} = useCatFact()
    const { imageUrl } = useCatImage({fact})
    console.log(fact)

    return (
        <main>
            <h1>App de gatitos</h1>

            <button onClick={refreshRandomFact}>Get new fact</button>

            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`}/>}

        </main>
    )
}