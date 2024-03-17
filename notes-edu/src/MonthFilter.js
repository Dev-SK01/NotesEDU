import React from 'react'

const MonthFilter = ({handleFilter}) => {
  return (
    <>
     <div className="month-list container">
       <span onClick={(e)=>(handleFilter(e))} className='active'>ALL</span>
       <span onClick={(e)=>(handleFilter(e))}>JAN</span>
       <span onClick={(e)=>(handleFilter(e))}>FEB</span>
       <span onClick={(e)=>(handleFilter(e))}>MAR</span>
       <span onClick={(e)=>(handleFilter(e))}>APR</span>
       <span onClick={(e)=>(handleFilter(e))}>MAY</span>
       <span onClick={(e)=>(handleFilter(e))}>JUN</span>
       <span onClick={(e)=>(handleFilter(e))}>JULY</span>
       <span onClick={(e)=>(handleFilter(e))}>AUG</span>
       <span onClick={(e)=>(handleFilter(e))}>SEP</span>
       <span onClick={(e)=>(handleFilter(e))}>OCT</span>
       <span onClick={(e)=>(handleFilter(e))}>NOV</span>
       <span onClick={(e)=>(handleFilter(e))}>DEC</span>
     </div>
    </>
  )
}

export default MonthFilter