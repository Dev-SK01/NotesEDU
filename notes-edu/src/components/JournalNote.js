import React, { useState } from 'react';
import '../css/journal.css';
import MonthFilter from './MonthFilter';
import Import from './Import';
import confetti from 'canvas-confetti';
import DayStatus from './DayStatus';
/*
  -handlesave() handles the sava function
  -addNotes() handles the new note
  -handleremove() handles deleting notes function
  -saveDataOnChange() user enter thetext it automatically store the data
  -addNumberOnEnter() adding the number infornt of new line created.
  -handleSearch() handles the search funcitonality.
*/

const JournalNote = () => {
    // getting the data from localstorage
    const parsedJournal = JSON.parse(localStorage.getItem('journalData'));
    // console.log(parsedJournal);
    const [journalData, setJournalData] = useState(parsedJournal || [])
    const showNotes = (e) => {
        // console.dir(e.target.parentNode.nextSibling)
        if (e.target.parentNode.nextSibling.style.display == 'block') {
            e.target.parentNode.nextSibling.style.display = 'none';
        } else {
            e.target.parentNode.nextSibling.style.display = 'block';
        }
    }
    const handleSave = (e, id) => {
        let combinedData;
        if (e.target.parentNode.nextSibling.value == '') {
            e.preventDefault();
            showNotes(e);
            alert('Content Empty !!');
        } else {
            const ExistingData = journalData.filter((journal) => {
                if (journal.id != id) {
                    return journal
                }
            })
            // console.log(ExistingData) 
            // Handles the while the data is edited
            const EditedData = journalData.filter((data) => {
                let Edited = e.target.parentNode.nextSibling.value;
                if (data.id == id) {
                    data.note = Edited;
                    return data
                }
            })
            // console.log(EditedData)
            // joining the previous data with new data
            combinedData = EditedData.concat(ExistingData);
            e.preventDefault();
            setJournalData(combinedData);
            localStorage.setItem('journalData', JSON.stringify(combinedData));
            showNotes(e);
        }
    }
    const saveDataOnChange = (e, id) => {
        let combinedData;
        // finding the existing data
        const ExistingData = journalData.filter((journal) => {
            if (journal.id != id) {
                return journal
            }
        })
        // console.log(ExistingData)
        // Handles the while the data is edited & finds the edited data
        let Edited = e.target.value;
        const EditedData = journalData.filter((data) => {
            if (data.id === id) {
                data.note = Edited;
                return data
            }
        })
        // console.log(EditedData)
        // joining the previous data with new data
        combinedData = EditedData.concat(ExistingData);
        setJournalData(combinedData);

    }
    function addNumberOnEnter(e, id) {
        let enteredString = e.target.value;
        if (e.keyCode === 13) {
            // checking if the enter key is pressed
            let splittedString = enteredString.split('\n');
            enteredString = '';
            // adding number inform of the \n 1.
            enteredString += (`${splittedString.length - 1}.`);
            // console.log(enteredString);
            let combinedData;
            // finding the existing data
            const ExistingData = journalData.filter((journal) => {
                if (journal.id != id) {
                    return journal
                }
            })
            // console.log(ExistingData)
            // Handles the while the data is edited & finds the edited data
            const EditedData = journalData.filter((data) => {
                if (data.id === id) {
                    data.note += enteredString;
                    return data
                }
            });
            // joining the previous data with new data
            combinedData = EditedData.concat(ExistingData);
            localStorage.setItem('journalData', JSON.stringify(combinedData));
            setJournalData(combinedData);
        }
    }
    const addNewNotes = (e) => {
        const id = new Date().getTime();
        const date = new Date().toDateString();
        const note = '';
        e.preventDefault();
        alert('Journal Added')
        const newNote = [{
            id,
            date,
            note,
            status: {
                happy: false,
                productive: false,
                nuetral: false,
                sad: false
            }
        }];
        setJournalData(newNote.concat(journalData));
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        localStorage.setItem('journalData', JSON.stringify(newNote.concat(journalData)));
        // console.log(newNote)
    }
    const handleRemove = (id, e) => {
        e.preventDefault();
        if (window.confirm('Do you Want To Delete ?')) {
            const removeData = journalData.filter((dataobj) => {
                if (dataobj.id != id) {
                    return dataobj;
                }

            })
            // console.log(removeData)
            setJournalData(removeData);
            localStorage.setItem('journalData', JSON.stringify(removeData));
        }

    }

    // this function is under testing | testing completed
    const handleSearch = (e) => {
        const searchedData = parsedJournal.filter((searchjournal) => {
            let searchdata = e.target.value.toString().toLowerCase().trim() ?? 'Test';
            if (searchdata == "") {
                searchdata = 'No Relative Results Found...';
            }
            else {
                searchdata = searchdata;
            }
            const findjournal = searchjournal.date.toLowerCase().trim();
            console.log(findjournal.indexOf(searchdata), searchdata)
            if (findjournal.indexOf(searchdata) != -1) {
                console.log(searchjournal);
                return searchjournal;
            }
        })
        if (searchedData.length == 0) {
            setJournalData(parsedJournal);
        } else {
            setJournalData(searchedData)
        }


    }

    // function for handle the filter 
    function handleFilter(e) {
        const month = e.target.innerText;
        e.target.classList = "active";
        // logic for finding the array with classname == active
        const child = e.target.parentNode.childNodes;
        const filteredChild = [];
        // finding the array with classname == active
        for (var i = 0; i <= child.length - 1; i++) {
            if (child[i].className == 'active') {
                filteredChild.push(child[i]);
            }
        };
        // setting the element classname == '';
        filteredChild.forEach((arr) => {
            if (arr !== e.target) {
                arr.className = "";
            }
        });
        // console.log(filteredChild.length)
        // console.log(child.length)
        if (month === "ALL") {
            if (parsedJournal !== null) {
                setJournalData(parsedJournal)
            }

        } else {
            if (parsedJournal !== null) {
                const filteredMonth = parsedJournal.filter((data) => {
                    // checking the month active using the date
                    if (data.date.toLowerCase().includes(month.toLowerCase()) == true) {
                        return data
                    }
                });
                setJournalData(filteredMonth);
            }


        }


    }
    function handleDayStatus(e) {
        const statusId = Number(e.target.classList[0]);
        const parentId = Number(e.target.parentNode.parentNode.id);
        console.log(e.target.classList[0]);
        const filteredJournalData = journalData.filter((data)=>{
            if(data.id === parentId){
                return data;
            }
        });
        const dayStatus = statusId === 1 ? 'happy' : statusId === 2 ? 'productive' : statusId === 3 ? 'nuetral' : statusId === 4 ? 'sad' : '' ;
        console.log(filteredJournalData ,dayStatus);
        const existingData = journalData.filter((data)=>{
            if(data.id !== parentId){
                return data
            }
        });
        filteredJournalData[0].status[dayStatus] = !filteredJournalData[0].status[dayStatus];
        // console.log(filteredJournalData[0].status);
        const combinedData = existingData.concat(filteredJournalData);
        // console.log(combinedData);
        localStorage.setItem('journalData', JSON.stringify(combinedData));
        setJournalData(combinedData)
      }
    return (
        <div className='journal-div'>
            <div className="new-btn container">
                <input
                    type="text"
                    placeholder='Seach Your Notes...'
                    onChange={(e) => handleSearch(e)}
                />
                <i
                    className="bi bi-file-earmark-plus-fill"
                    onClick={(e) => addNewNotes(e)}
                ></i>
            </div>
            <Import journalData={journalData} setJournalData={setJournalData} Storage="journalData" />
            <MonthFilter handleFilter={handleFilter} />
            <div className="container">
                {journalData.length > 0
                    ?
                    <div className="journal-container"  >
                        <div className="journal" >
                            {journalData.map((data) => (
                                <div key={data.id}>
                                {/* condidition checking for data has Status prop */}
                                    {data.status ?
                                        <>
                                            <DayStatus journalData ={data} handleDayStatus={handleDayStatus} />
                                            <div className='title' >
                                                <p onClick={(e) => showNotes(e)}>{data.date}
                                                    <i
                                                        className="bi bi-trash remove"
                                                        onClick={(e) => handleRemove(data.id, e)}

                                                    ></i>

                                                </p>
                                                <i
                                                    className="bi bi-check2-circle save"
                                                    onClick={(e) => handleSave(e,data.id)}
                                                ></i>
                                                <span className='smallnote' >
                                                    {data.note.slice(0, 50)}<br />
                                                    {data.note.slice(50, 100)}<br />
                                                </span>
                                            </div>
                                            <textarea
                                                name="textarea"
                                                id={data.id}
                                                cols="20"
                                                rows="10"
                                                autoCapitalize='on'
                                                autoCorrect='on'
                                                placeholder='Enter Your Notes Here....'
                                                value={data.note}
                                                onChange={(e) => (saveDataOnChange(e, data.id))}
                                                onKeyUp={(e) => addNumberOnEnter(e, data.id)}
                                            ></textarea>
                                        </>
                                        :
                                        // else showing the default UI
                                        <>

                                            <div className='title' >
                                                <p onClick={(e) => showNotes(e)}>{data.date}
                                                    <i
                                                        className="bi bi-trash remove"
                                                        onClick={(e) => handleRemove(data.id, e)}

                                                    ></i>

                                                </p>
                                                <i
                                                    className="bi bi-check2-circle save"
                                                    onClick={(e) => handleSave(e,data.id)}
                                                ></i>
                                                <span className='smallnote' >
                                                    {data.note.slice(0, 50)}<br />
                                                    {data.note.slice(50, 100)}<br />
                                                </span>
                                            </div>
                                            <textarea
                                                name="textarea"
                                                id={data.id}
                                                cols="20"
                                                rows="10"
                                                autoCapitalize='on'
                                                autoCorrect='on'
                                                placeholder='Enter Your Notes Here....'
                                                value={data.note}
                                                onChange={(e) => (saveDataOnChange(e, data.id))}
                                                onKeyUp={(e) => addNumberOnEnter(e, data.id)}
                                            ></textarea>
                                        </>
                                    }

                                </div>
                            ))}
                        </div>
                    </div>
                    // showing the error message if there is no list
                    :
                    <div className="empty-list">
                        <i className="bi bi-emoji-dizzy-fill"></i>
                        <p>Your  Notes are Empty ^_^ </p>
                    </div>
                }
            </div >

        </div>
    )
}

export default JournalNote