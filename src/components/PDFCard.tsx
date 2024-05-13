import { useEffect } from 'react'
import { useState } from 'react';

function PDFCard() {
    const PDFLink = Object.keys(localStorage).filter(key => key.startsWith('PDF'))[0];
    const PDFLinkActual = localStorage.getItem(PDFLink);
    const [PDFTitle, setPDFTitle] = useState('');
    let TitleMatch = ""
    useEffect(()=>{
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(PDFLinkActual)}`)
                    .then(response => {
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    .then(data => {
                        TitleMatch = JSON.stringify(data.contents.match(/<title>(.*?)<\/title>/)[1]).replace(/^"|"|- Google Drive"$/g, '')
                        setPDFTitle(TitleMatch);
                    })
    })        
  return (
    <div className='PDFCard'>
    <div className='CardUpperSection'>{PDFTitle !=='' && <div className='PDFTitle'>{PDFTitle}</div>}<img src='src\assets\whitewa.svg'></img></div>
    <embed src={PDFLinkActual} type="" />
    </div>
  )
}

export default PDFCard