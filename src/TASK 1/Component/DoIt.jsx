import React from 'react'
import useCustomHook from './useCustomHook'

const DoIt = () => {

    const {counter,increment,decrement}=useCustomHook();
  return (
    <div className='useCustom'>
        <h1>Hello World</h1>
        <h1>Value is {counter}</h1>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
    </div>
  )
}

export default DoIt;