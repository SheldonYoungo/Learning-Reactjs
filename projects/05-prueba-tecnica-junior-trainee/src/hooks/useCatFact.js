import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
    const [fact, setFact] = useState()
    
    const refreshRandomFact = () => getRandomFact().then(setFact)

    useEffect(refreshRandomFact, [])

    return {fact, refreshRandomFact}
}