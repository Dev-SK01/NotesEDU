import React from 'react';
import './css/import.css';
const Import = ({ journalData, setJournalData }) => {


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
            link.download = "NotesEDU.json";
            output.textContent = "Your Data Exported! See Your Downloads Folder!";
            link.click();

            URL.revokeObjectURL(url);
            setTimeout(() => {
                output.style.display = 'block';

            },1);
            setInterval(()=>{
                output.style.display = 'none'
            },3000)
        }

    }

    // function for Import Json Data
    function importData() {
        // getting the json data uploaded by the user
        const fileUpload = document.getElementById("fileUpload");
        const output = document.getElementById("output");
        const selectedFile = fileUpload.files[0];

        if (!selectedFile) {
            output.textContent = "Please select a JSON file to import.";
            setTimeout(() => {
                output.style.display = 'block';

            },1);
            setInterval(()=>{
                output.style.display = 'none'
            },3000)
            return;
        }

        if (!selectedFile.type.match("application/json")) {

            output.textContent = "Please select a valid JSON file.";
            setTimeout(() => {
                output.style.display = 'block';

            },1);
            setInterval(()=>{
                output.style.display = 'none'
            },3000)
            return;
        }

        const reader = new FileReader();
        console.log(reader);
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                let isSameData;
                console.log(jsonData);
                console.log(event);
                // checking the data the previous data if present 
                if (journalData.length) {
                    // checking the same data imported
                    jsonData.forEach((data) => {
                        journalData.forEach((localData) => {
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
            
                        output.textContent = "Same Data Imported"; // Format for readability
                        setTimeout(() => {
                            output.style.display = 'block';
            
                        },1);
                        setInterval(()=>{
                            output.style.display = 'none'
                        },3000)
                    } else {
                        const TotalJournalData = [...journalData, ...jsonData];
                        setJournalData(TotalJournalData);
            
                        output.textContent = "Data Imported !";
                        localStorage.setItem('journalData', JSON.stringify(TotalJournalData));
                        setTimeout(() => {
                            output.style.display = 'block';
            
                        },1);
                        setInterval(()=>{
                            output.style.display = 'none'
                        },3000)
                    }
                    // No data found setting the data
                } else {
                    setJournalData(jsonData);
                    localStorage.setItem('journalData', JSON.stringify(jsonData))
                }
            } catch (error) {
    
                output.textContent = "Please Export Then Upload the JSON File.... ";
                setTimeout(() => {
                    output.style.display = 'block';
    
                },1);
                setInterval(()=>{
                    output.style.display = 'none'
                },3000);
            }
        };

        reader.readAsText(selectedFile);
    }
    return (
        <>
            <div className="json-container">
                <input type="file" id="fileUpload" accept=".json" />
                <span id="import-btn" onClick={() => (importData())}>Import</span>
                <span id="export-btn" onClick={() => (exportData(journalData))}>Export</span>
            </div>
            <pre id="output"></pre>
        </>
    )
}

export default Import