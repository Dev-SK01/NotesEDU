import React, { useState } from 'react';
import '../css/App.css'
const DayStatus = ({ journalData, handleDayStatus }) => {
  
  const [happy, setHappy] = useState(journalData.status.happy);
  const [productive, setProductive] = useState(journalData.status.productive);
  const [nuetral, setNuetral] = useState(journalData.status.nuetral);
  const [sad, setSad] = useState(journalData.status.sad);


  return (
    <div className='day-status' id={journalData.id} key={journalData.id}>
      <span className='happy ' >
        <input type="checkbox" onChange={(e) => { e.stopPropagation();handleDayStatus(e); setHappy(e.target.checked); }} className='1 form-check-input' checked={happy} />😍
      </span>
      <span className='productive'>
        <input type="checkbox" onChange={(e) => { e.stopPropagation();handleDayStatus(e); setProductive(e.target.checked); }} className='2 form-check-input' checked={productive} />🚀
      </span>
      <span className='nuetral'>
        <input type="checkbox" onChange={(e) => { e.stopPropagation();handleDayStatus(e); setNuetral(e.target.checked); }} className='3 form-check-input' checked={nuetral} />😃
      </span>
      <span className='sad'><input type="checkbox" onChange={(e) => { e.stopPropagation();handleDayStatus(e); setSad(journalData.status.sad); }} className='4 form-check-input' checked={sad} />😔
      </span>
    </div>
  )
}
React.memo(DayStatus);
export default DayStatus;
