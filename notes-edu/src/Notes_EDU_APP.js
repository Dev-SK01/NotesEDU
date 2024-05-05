import React, { useRef, useState } from 'react'
import { ListItem } from './TodoApp';
import './css/App.css'
import { Footer } from './Footer';
import {  Route, Routes } from 'react-router-dom';
import JournalNote from './JournalNote';
import Header from './Header';
import Import from './Import';
import confetti from 'canvas-confetti';

// Getting the data from local storage
const ParsedLocalList = JSON.parse(localStorage.getItem('ListData'));
function Notes_EDU_APP() {

    /* 
       -Using React Hook to update the data realtime
       -itemobj has the data of the current data , setitem change the data when data updated 
       -handleDelete() handles the delete function
       -handlechange*() handles when the  task completed or not 
       -AddListElement() handles the new data added --> handleSubmit() handle the data is added
   
   */
    const backToInput = useRef()
    const [itemobj, setItem] = useState(ParsedLocalList || [])

    function handlechange(id) {
        const list_item = itemobj.map((item) => (
            item.id === id ? { ...item, checked: !item.checked } : item))

        setItem(list_item);
        // storing the to the local storage when the task completed
        localStorage.setItem('ListData', JSON.stringify(list_item))
    }

    function handleDelete(id, e) {
        e.preventDefault();
        const list_item = itemobj.filter((item) => (
            item.id != id
        ))
        if (window.confirm('Are You Sure ?')) {
            setItem(list_item);
            // storing the to the local storage when the task deleted
            localStorage.setItem('ListData', JSON.stringify(list_item))
        }
    }

    // -----------------------------------------------

    //  Creating Add List component
    const AddListElement = () => {

        const [listItem, setListItem] = useState('');

        function setInputData(inputListData) {
            const id = itemobj.length ? itemobj[itemobj.length - 1].id + 1 : 1;
            const NewListData = {
                id,
                checked: false,
                data: inputListData,
                Done: 0,
                UnDone: 0
            };
            const addListData = [...itemobj, NewListData];
            // ListData.push(NewListData);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            setItem(addListData);
            localStorage.setItem('ListData', JSON.stringify(addListData));
        }

        function handleListSubmit(e) {
            e.preventDefault();
            // adding the list to the ListData Object
            alert('List Added')
            setInputData(listItem)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            // clearing the input after list added
            setListItem('');
        }
        //  ------------------------------- rendering the header  --------------------
        return (
            <>
                <form className='List-form' onSubmit={handleListSubmit}>
                    {/* Input Field to get the list */}
                    <input
                        type="text"
                        id='list-input'
                        ref={backToInput}
                        placeholder='Enter Your List To Add'
                        required
                        value={listItem}
                        onChange={(e) => (setListItem(e.target.value))}
                        className='input'
                    />
                    <button
                        type='submit'
                        className='add-btn'
                        onChange={() => (backToInput.current.focus())}>
                        <i className="bi bi-check2-circle"></i>
                    </button>
                </form>


            </>

        )


    }
    //    creatig a welcome div 
    const WelcomeDiv = () => {
        return (
            <>
                <div className="welcome-div">
                    {/* celebration div */}
                    <div className="celebration" id='celebration'>

                    </div>
                    <div className="welcome-text">
                        <p contentEditable="true">Hello👋</p>
                    </div>
                    <div className="welcome-icon">
                        <p contentEditable="true">Buddy,</p>
                    </div>
                    <div className="welcome-img">
                    </div>
                </div>

            </>
        )
    }
    return (
        <>
           <Header />
            <Routes>
                {/* todo App Route */}
                <Route path="NotesEDU"
                    element={<JournalNote WelcomeDiv={WelcomeDiv} />}>
                </Route>
                <Route path='NotesEDU/todo'
                    element={
                        <>
                            <AddListElement />
                            <Import journalData = {itemobj} setJournalData={setItem}  Storage ="ListData"/>
                            <section className='Content'>
                                <ListItem
                                    ItemObj={itemobj}
                                    handleDelete={handleDelete}
                                    handlechange={handlechange}
                                />
                            </section>

                            <Footer
                                react=" You Have "
                                length={itemobj.length}
                            />
                        </>}>
                </Route>
                {/* Journal App Route */}
                <Route path='NotesEDU/journal'
                    element={<JournalNote  />}
                ></Route>

            </Routes>
                        
        </>
    )

}





export { Notes_EDU_APP };
