import { useState, useEffect } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    console.log('effect', {enabled})

    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }

    if(enabled){
      window.addEventListener('pointermove', handleMove)
    } 

    // Cleanup:
    // ---> Cuando cambian las dependecias, antes de ejecutar el efecto de nuevo
    // ---> Cuando el componente se desmonta
    return () => { 
      console.log('cleanup') 
      window.removeEventListener('pointermove', handleMove)
    } 
  }, [enabled])
  
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}></div>

      <button onClick={()=> setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {

  return (
    <main>
      <FollowMouse/>
    </main>
  )
}

export default App
