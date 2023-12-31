import React from "react";
import './App.css'


const List_Keys = ({ ItemObj, handleDelete, handlechange }) => {



    return (
        <>


            <section className='list-div'>


                <ul>
                    {/* empty data error message */}
                    {ItemObj.length > 0
                        ?
                        (ItemObj.map((item) => (
                            <li
                                className=' form-check form-switch'
                                key={item.id}
                            >
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    class="form-check-input"
                                    id={item.id}
                                    checked={item.checked}
                                    onChange={() => (handlechange(item.id))}
                                />
                               
                                <label
                                    htmlFor={item.id}
                                    className=' form-check-label item-data'
                                    style={(item.checked ?
                                        { color: 'green', textDecoration: 'line-through' }
                                        : {})}
                                >
                                    {item.data}
                                </label>
                                <span
                                    className="completed"
                                    style={(item.checked ? {} : { display: 'none' })}
                                >🎉</span>
                                <button className='list-btn'
                                    onClick={() => (handleDelete(item.id))}>
                                    <i className="bi bi-bookmark-x-fill"></i>
                                </button>

                            </li>
                        )))
                        // showing the error message if there is no list
                        :
                        <div className="empty-list">
                            <i className="bi bi-emoji-dizzy-fill"></i>
                            <p>Your List Is Empty ):</p>
                        </div>
                    }
                </ul>
            </section>
        </>

    )
}

export { List_Keys };