import React from 'react'

const MonthFilter = ({handleFilter}) => {
  const months = ['JAN' ,'FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  return (
    <>
     <div className="month-list container">
       <span onClick={(e)=>(handleFilter(e))} className='active'>ALL</span>
      {months.map((month) => (
        <span onClick={(e)=>(handleFilter(e))} key={month}>{month}</span>
        ))};
     </div>
    </>
  )
}
React.memo(MonthFilter);
export default MonthFilter ;