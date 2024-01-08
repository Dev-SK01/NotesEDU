import React, { useState } from 'react';
import './journal.css';

const JournalNote = () => {

    const [journalData, setJournalData] = useState([
        {
            id: new Date().getTime() + 1,
            date: new Date().toDateString(),
            note: `I am So Proud
                i am good , i'm sooo good
                good good`
        },
        {
            id: new Date().getTime() + 2,
            date: new Date().toDateString(),
            note: `I am So Proud
                i am good , i'm sooo good
                good good`
        }, {
            id: new Date().getTime() + 3,
            date: new Date().toDateString(),
            note: `I am So Proud
                i am good , i'm sooo good
                good good`
        },
    ] || [])
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
        console.log(ExistingData)
       const EditedData = journalData.filter((data) => {
            let Edited = e.target.parentNode.nextSibling.value;
            if (data.id == id) {
                data.note = Edited;
                return data
            }
        })
        console.log(EditedData)
        localStorage.setItem('journalData' , JSON.stringify([...ExistingData,EditedData]))
    }
    return (
        <>

            <div className="new-btn container">
                <i class="bi bi-file-earmark-plus-fill"></i>
            </div>
            <div className="container">
                <div className="journal-container">
                    <div div className="journal">
                        {journalData.map((data) => (
                            <>
                                <div className='title'>
                                    <p onClick={(e) => showNotes(e)}>{data.date}</p>
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
            </div >

        </>
    )
}

export default JournalNote