import { useEffect, useState } from 'react';
const ActionSection = () => {
    const [inputValue, setInputValue] = useState('');
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState()
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      console.log(inputValue)
    };
    useEffect(() => {
      console.log(inputValue);
    }, [inputValue]);
    useEffect(() => {
      const existingKeys = Object.keys(localStorage).filter(key => key.startsWith('PDF'));
      if (existingKeys.length > 0) {
          const lastIndex = existingKeys.map(key => parseInt(key.slice(3))).reduce((a, b) => Math.max(a, b));
          setKey(lastIndex + 1);
      }
      const handleLocalStorage = () => {
        const key = `PDF${index}`;
        const replacedValue = inputValue.replace(/\/view\?usp=(drive_link|sharing)/, '/preview');
        localStorage.setItem(key, replacedValue);
        setIndex(prevIndex => prevIndex + 1);
      };
      if (inputValue) {
        handleLocalStorage();
      }
    }, [inputValue])
    // useEffect(() => {
    //   setKey(prevKey => prevKey + 1);
    //   inputValue !== '' && localStorage.setItem(key,inputValue.replace(/\/(view\?usp=drive_link|view\?usp=sharing)/, '/preview'))
    // },[inputValue])
    useEffect(()=>{
      
    },[])
    const PDFLink = Object.keys(localStorage).filter(key => key.startsWith('PDF'))[0]

    // useEffect(()=>{
    //   PDFLink &&  window.location.reload();
    // },[PDFLink])
  return (
    <div className='BottomContainer'>
    {!PDFLink && <input type="text" placeholder='Paste PDF URL' value={inputValue} 
    onChange={handleInputChange} />}
    {PDFLink && <input type="text" placeholder='Paste G-Drive Link of Doc' value={inputValue} 
    onChange={handleInputChange} />}
    {PDFLink && <button>Share All to WA<img src="src\assets\wa.svg" alt="" /></button>}
    </div>
  )
}

export default ActionSection