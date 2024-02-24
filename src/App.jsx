import { useState, useCallback, useEffect, useRef} from "react"

function App() {
 const [length, setLength] = useState(8)
 const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+";;

    for(let i =1; i<=length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed,  passwordGenerator])

  const copy = useCallback(()=> {
    passRef.current.select();
    // passRef.current.setSelectionRange(0,100); 
    window.navigator.clipboard.writeText(password)
  },[password])

  const passRef = useRef(null)

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-center mb-2">Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" ref={passRef} readOnly/>
        <button onClick={copy} className="outline-none bg-orange-400 text-white px-3 py-3 shrink-0 hover:bg-orange-500 active:bg-opacity-40 transition-colors duration-300">copy</button>
       </div> 

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input type="range" min={6} max={100} value={length} className="cursor=pointer" onChange={(e) => {setLength(e.target.value) }} />
            <label>length: {length}</label>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={()=> {setNumberAllowed((prev) =>!prev)}} />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={charAllowed} id="charInput"  onChange={()=> {setCharAllowed((prev) =>!prev)}} />
              <label htmlFor="charInput">Special char</label>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
