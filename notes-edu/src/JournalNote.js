import React from 'react';
import './journal.css';

const JournalNote = () => {
    return (
        <>

            <div className="new-btn container">
                <i class="bi bi-file-earmark-plus-fill"></i>
            </div>
            <div className="container">
                <div className="journal-container">
                    <div className="journal">
                        <p>{new Date().toDateString()}</p>
                        <textarea
                            name="textarea"
                            id={
                                new Date().toLocaleDateString().slice(0,5).replace('/','-')
                            }
                            cols="20"
                            rows="10"
                        >

                        </textarea>
                    </div>
                </div>
            </div>

        </>
    )
}

export default JournalNote