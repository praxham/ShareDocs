import React, { useState } from 'react';

function ActionSection() {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      console.log(inputValue)
    };
  return (
    <div className='BottomContainer'>
    <input type="text" placeholder='Paste G-Drive Link of Doc' value={inputValue} 
    onChange={handleInputChange} />
    <button>Share to <img src="src\assets\wa.svg" alt="" /></button>
    </div>
  )
}

export default ActionSection