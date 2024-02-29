import React, { useState } from 'react';
import './css/journal.css';


/*
  -handlesave() handles the sava function
  -addNotes() handles the new note
  -handleremove() hanfdles daleting notes function
*/

const JournalNote = () => {
    // getting the data from localstorage
    const parsedJournal = JSON.parse(localStorage.getItem('journalData'));
    console.log(parsedJournal);
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
        const combinedData = EditedData.concat(ExistingData);
        setJournalData(combinedData);
        localStorage.setItem('journalData', JSON.stringify(combinedData))
        showNotes(e);
    }
    const addNewNotes = () => {
        const id = new Date().getTime();
        const date = new Date().toDateString();
        const note = '';
        const newNote = [{ id, date, note }];
        setJournalData(newNote.concat(journalData))
        localStorage.setItem('journalData', JSON.stringify(newNote.concat(journalData)))
        console.log(newNote)
    }
    const handleRemove = (id) => {
        const removeData = journalData.filter((dataobj) => {
            if (dataobj.id != id) {
                return dataobj;
            }

        })
        console.log(removeData)
        setJournalData(removeData);
        localStorage.setItem('journalData', JSON.stringify(removeData));
    }

    // this function is under testing | testing completed
    const handleSearch = (e) => {
        const searchedData = parsedJournal.filter((searchjournal) => {
            let searchdata = e.target.value.toString().toLowerCase().trim() ?? 'Test';
            if (searchdata == "") {
                searchdata = 'no Data';
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
    return (
        <>

            <div className="new-btn container">
                <input
                    type="text"
                    placeholder='Seach Your Notes...'
                    onChange={(e) => handleSearch(e)}
                />
                <i
                    class="bi bi-file-earmark-plus-fill"
                    onClick={() => addNewNotes()}
                ></i>
            </div>
            <div className="container">
                {journalData.length > 0
                    ?
                    <div className="journal-container">
                        <div div className="journal">
                            {journalData.map((data) => (
                                <>
                                    <div className='title'>
                                        <p onClick={(e) => showNotes(e)}>{data.date}
                                            <i
                                                class="bi bi-x-circle remove"
                                                onClick={() => handleRemove(data.id)}
                                            ></i>
                                        </p>
                                        <i
                                            className="bi bi-check2-circle save"
                                            onClick={(e) => handleSave(e, data.id)}
                                        ></i>
                                    </div>
                                    <textarea
                                        name="textarea"
                                        id={data.id}
                                        cols="20"
                                        rows="10"
                                        autoCapitalize='on'
                                        autoCorrect='on'
                                        placeholder='Enter Your Notes Here....'
                                        key={data.id}
                                    >
                                        {data.note}
                                    </textarea>
                                </>
                            ))}
                        </div>
                    </div>
                    // showing the error message if there is no list
                    :
                    <div className="empty-list">
                        <i className="bi bi-emoji-dizzy-fill"></i>
                        <p>Your  Notes are Empty ):</p>
                    </div>
                }
            </div >

        </>
    )
}

export default JournalNote