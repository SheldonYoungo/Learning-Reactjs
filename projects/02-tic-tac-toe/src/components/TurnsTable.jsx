import { Square } from "./Square";

export function TurnsTable ({actualTurn, turns}) {
    return (
        <section className='turn'>
            <Square isSelected={actualTurn === turns.X}>
                {turns.X}
            </Square>
            <Square isSelected={actualTurn === turns.O}>
                {turns.O}
            </Square>
        </section>
    )
}