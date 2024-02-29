/*
 -this file contains feature testing code. 
 -
*/



/*           ---- Reset and completion count functionality ----
let Currentdate = new Date().toDateString().slice(0,3);
console.log(Currentdate);

if (Currentdate == new Date().toDateString().slice(0,3)){
     Currentdate = new Date().toDateString();
      console.log('Funciton Executed',Currentdate);
}

function resetList(listobj){

    const ModifiedList = listobj.map((item) => {
        if (item.checked == false) {
            item.UnDone = item.UnDone + 1;
        } else {
            item.Done = item.Done + 1;
        }
        item.checked = false;
        console.log(item);
        return item

    })
    localStorage.setItem('ListData', JSON.stringify(ModifiedList));

 }
*/

// testing the search function

const handleSearch= (e)=>{
    const search =journalData.map((searchjournal)=>{
         const searchdata = e.target.value.toString().toLowerCase().trim();
         const findjournal = searchjournal.date.toLowerCase().trim().indexOf(searchdata);
         if(findjournal != -1){
            return searchjournal
         }else{
             return searchjournal
         }
     })
     setJournalData(search)
 }