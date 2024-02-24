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
    <div class="container my-5">
      <div class="bg-dark-subtle px-3 py-5 rounded-4">
        <h1 class="text-center text-black text-uppercase mb-5">Password Generator</h1>
        <div class="d-flex justify-content-center align-items-center mb-5 gap-2 ">
          <input type="text" class="form-control mr-2" readOnly value={ password } placeholder="Password" ref={ passReference } />
          <button onClick={ copyPasswordToClipBoard } class="btn btn-primary">Copy</button>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center bg-light border rounded-3 px-3 py-2 gap-2 ">
              <input type="range" class="form-range" id="range" min={ 0 } max={ 20 } value={ length } onChange={ setLengthRange } />
              <label for="range" class="btn btn-primary cursor">Length({ length })</label>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center justify-content-center  bg-light border rounded-3 px-3 py-2 gap-3 ">
              <input type="checkbox" id="numbers" onChange={ () => setNumAllowed(!numAllowed) } />
              <label for="numbers" class="btn btn-primary">Numbers</label>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center justify-content-center  bg-light border rounded-3 px-3 py-2 gap-3 ">
              <input type="checkbox" id="char" onChange={ () => setCharAllowed(!charAllowed) } />
              <label for="char" class="btn btn-primary">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App;