// 1.- React se maneja mediante componentes que pueden ser reutilizados en nuestra aplicacion,
//  añadiendo escalabilidad al programa en cuestión
// 
// Existen  dos formas de crear un componente en React: la forma imperativa (indicamos al programa
// lo que tiene que renderizar) y la forma declarativa (declaramos al programa lo que debe renderizar).
//  El primer metodo es considerada mala practica al ser dificil de leer a la hora de crear mas de un componente,
//  mientras que el segundo metodo es mas legible al ullizar formato JSX (Javascript XML).

import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Los nombres de los componentes siempre deben ser escritos en PascalCase (primera letra en mayuscula)
const CreateBtn = ({text}) => {
  return (<button>{text}</button>)
}

root.render(
  <React.Fragment>
    {/*
    -- Forma imperativa de crear un componente --

    {CreateBtn({text: 'Hola mundo'})}
    {CreateBtn({text: 'Hola desde otro sitio'})}
    {CreateBtn({text: 'Hola desde otro mundo'})}
    */}
    

    {/* Forma  declarativa de crear un componente (buena práctica) */}
    <CreateBtn text='Hola Mundo'/>
    <CreateBtn text='Hola desde otro sitio'/>
    <CreateBtn text='Hola desde otro Mundo'/>

  </React.Fragment>
  )
