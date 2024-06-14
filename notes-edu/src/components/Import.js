import React from 'react';
import '../css/import.css';
import confetti from 'canvas-confetti'
const Import = ({ journalData, setJournalData, Storage }) => {

    // console.log(Storage);
// reset function for the ToDoApp to reset all  todo 
    function resetTododata() {
       const data =  journalData.map((data) => {
        // code for  reset the data for the checked = alse
            data.checked = false;
            console.log(data);
            return data
        });
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
          });
        setJournalData(data);
        localStorage.setItem('ListData' , JSON.stringify(data))
    }
    // function Export 
    function exportData(data) {
        console.log(data);
        const output = document.getElementById("output");
        if (journalData.length == 0) {
            output.textContent = "Sorry! No Journal Found!"
        } else {
            const jsonData = JSON.stringify(data); // Format the JSON for readability
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            if (Storage == 'journalData') {
                link.download = "JournalData.json";
            } else {
                link.download = "ToDoData.json";
            }
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            output.textContent = "Your Data Exported! See Your Downloads Folder!";
            link.click();

            URL.revokeObjectURL(url);
            setTimeout(() => {
                output.style.display = 'block';

            }, 1);
            setInterval(() => {
                output.style.display = 'none'
            }, 3000)
        }

    }

    // function for Import Json Data
    function importData() {
        // getting the json data uploaded by the Client
        const fileUpload = document.getElementById("fileUpload");
        const output = document.getElementById("output");
        const selectedFile = fileUpload.files[0];

        if (!selectedFile) {
            output.textContent = "Please select a JSON file to import.";
            setTimeout(() => {
                output.style.display = 'block';

            }, 1);
            setInterval(() => {
                output.style.display = 'none'
            }, 3000)
            return;
        }

        if (!selectedFile.type.match("application/json")) {

            output.textContent = "Please select a valid JSON file.";
            setTimeout(() => {
                output.style.display = 'block';

            }, 1);
            setInterval(() => {
                output.style.display = 'none'
            }, 3000)
            return;
        }

        const reader = new FileReader();
        console.log(reader);
        reader.onload = (event) => {
            try {
                // parding the data 
                const jsonData = JSON.parse(event.target.result);
                // checking the data if the data id\s same or not 
                let isSameData;
                console.log(jsonData);
                console.log(event);
                // checking the data the previous data if present 
                if (journalData.length) {
                    // checking the same data imported
                    jsonData.forEach((data) => {
                        journalData.forEach((localData) => {
                            // checking the data by id if same or not 
                            if (data.id == localData.id) {
                                isSameData = true;
                            } else {
                                isSameData = false;
                            }
                        })
                    });
                    // console.log(isSameData);
                    // based on the isSameData result ;
                    if (isSameData) {

                        output.textContent = "Same Data Imported!!"; // Format for readability
                        setTimeout(() => {
                            output.style.display = 'block';

                        }, 1);
                        setInterval(() => {
                            output.style.display = 'none'
                        }, 3000)
                    } else {
                        // code for joining the imported data and previous data
                        const TotalJournalData = [...journalData, ...jsonData];
                        setJournalData(TotalJournalData);
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                          });
                        output.textContent = "Data Imported !";
                        localStorage.setItem(`${Storage}`, JSON.stringify(TotalJournalData));
                        // code for pop up about the status of the imported data
                        setTimeout(() => {
                            output.style.display = 'block';

                        }, 1);
                        setInterval(() => {
                            output.style.display = 'none'
                        }, 3000)
                    }
                // No data found setting the data
                } else {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                      });
                    setJournalData(jsonData);
                    localStorage.setItem(`${Storage}`, JSON.stringify(jsonData))
                }
            } catch (error) {

                output.textContent = "Please Export Then Upload the JSON File.... ";
                setTimeout(() => {
                    output.style.display = 'block';

                }, 1);
                setInterval(() => {
                    output.style.display = 'none'
                }, 3000);
            }
        };

        reader.readAsText(selectedFile);
    }

    // Return Statement for the entire import data container.
    return (
        <>
            <div className="json-container">
                <input type="file" id="fileUpload" accept=".json" />
                {
                // checking the appication for show thereset btn
                    Storage !== 'journalData' ?  
                        <>
                            <span id="import-btn" onClick={() => (resetTododata())}>Reset</span>
                            <span id="import-btn" onClick={() => (importData())}>Import</span>
                            <span id="export-btn" onClick={() => (exportData(journalData))}>Export</span>
                        </>
                     :
                        <>
                            <span id="import-btn" onClick={() => (importData())}>Import</span>
                            <span id="export-btn" onClick={() => (exportData(journalData))}>Export</span>
                        </>


                }

            </div>
            <pre id="output"></pre>
        </>
    )
}

export default Import