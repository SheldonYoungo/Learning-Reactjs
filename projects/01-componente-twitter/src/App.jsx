import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: 'JUJALAG',
        name: 'JUJALAG',
        isFollowing: true
    },
    {
        userName: 'midulive',
        name: 'midulive',
        isFollowing: false
    },
    {
        userName: 'midudev',
        name: 'midudev',
        isFollowing: true
    },
    {
        userName: 'alvamajo',
        name: 'Alva Majo',
        isFollowing: false
    }
]

export function App() {

    return (
        <section className='App'>
           {
            users.map(({userName, name, isFollowing}) => (

                <TwitterFollowCard 
                    key={userName}
                    userName={userName} 
                    initialIsFollowing={isFollowing}
                    >
                    {name}
                </TwitterFollowCard>

            ))
           }
        </section>
    )
}
