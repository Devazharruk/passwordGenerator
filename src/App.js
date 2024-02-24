import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  let [password, setPassword] = useState("dH7#;g13");
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*=+;:";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator, numAllowed, charAllowed, length]);

  const passReference = useRef(null);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passReference.current?.select();
    passReference.current?.setSelectionRange(0, 999);
  }
  const setLengthRange = (e) => {
    const newValue = e.target.value < 10 ? '0' + e.target.value : e.target.value;
    setLength(newValue);
  }


  return (
    <div>
      <div className='bg-dark-subtle  px-3 py-5  rounded-4 container my-5  '>
        <h1 className='text-center text-black text-uppercase space'>Password Generator</h1>
        <div className='d-flex gap-2 mt-5 '>
          <input type="text"
            className='form-control '
            readOnly
            value={ password }
            placeholder="Password"
            ref={ passReference }
          />
          <button onClick={ copyPasswordToClipBoard } className="btn btn-primary">Copy</button>
        </div>
        <div className='d-lg-flex d-sm-flex gap-sm-3  flex-sm-wrap  justify-content-between mt-5 '>
          <div className='d-flex border border-secondary rounded-3 px-3  py-2 gap-2 '>
            <input type="range"
              className='c-pointer'
              id="range"
              min={ 0 }
              max={ 20 }
              value={ length }
              onChange={ setLengthRange }
            />
            <label htmlFor="range" className='btn-primary btn cursor'>Length({ length })</label>
          </div>
          <div className='d-flex my-2 border border-secondary rounded-3 px-3  py-2 gap-2'>
            <input type="checkbox"
              id='numbers'
              onChange={ () => setNumAllowed(!numAllowed) }
            />
            <label htmlFor="numbers" className='btn btn-primary '>Numbers</label>
          </div>
          <div className='d-flex border border-secondary rounded-3 px-3  py-2 gap-2'>
            <input type="checkbox"
              id="char"
              onChange={ () => setCharAllowed(!charAllowed) }
            />
            <label htmlFor="char" className='btn btn-primary'>Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App