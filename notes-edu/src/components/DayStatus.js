import React from 'react';

const DayStatus = () => {
  return (
   <div className='day-status'>
     <input type="checkbox"/><span className='happy'>😍</span>
     <input type="checkbox" /><span className='productive'>🚀</span>
     <input type="checkbox" /><span className='nuetral'>😃</span>
     <input type="checkbox" /><span className='sad'>😔</span>
   </div>
  )
}

export default DayStatus
