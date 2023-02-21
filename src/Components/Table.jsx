
import React, { useState } from "react";
 
 function Table() {
   const [file, setFile] = useState();
   const [array, setArray] = useState([]);
 
   const fileReader = new FileReader();
 
   const handleOnChange = (e) => {
     setFile(e.target.files[0]);
   };
 
   const csvFileToArray = string => {
     const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
     const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
 
     const array = csvRows.map(i => {
       const values = i.split(",");
       const obj = csvHeader.reduce((object, header, index) => {
         object[header] = values[index];
         return object;
       }, {});
       return obj;
     });
 
     setArray(array);
   };
 
   const handleOnSubmit = (e) => {
     e.preventDefault();
 
     if (file) {
       fileReader.onload = function (event) {
         const text = event.target.result;
         csvFileToArray(text);
       };
 
       fileReader.readAsText(file);
     }
   };
 
  //  const headerKeys = Object.keys(Object.assign({}, ...array));
 
   return (
     <div style={{ 
      width: '98%',
      height: '98vh',
      textAlign: "center", 
      border: '1px solid black'
      }}>
       <div style={{
        border: '1px solid black',
        margin: '20px, 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
       }}>
        <div style={{
          display: 'flex'
        }}>
       <div className="oval" style={{
        backgroundColor: 'green'
       }}></div>
       <div className="oval" style={{
        backgroundColor: 'yellow'
       }}></div>
       <div className="oval" style={{
        backgroundColor: 'crimson'
       }}> </div>
       </div>
       <div style={{
        fontSize: '40px',
        marginLeft: '496px',
        fontStyle: 'italic'
       }}>CSV uploader </div>
       </div>
       <div className="inside">
       <form>
        {/* <label for="csvFileInput">
          Select file... */}
         <input style={{
          marginLeft: '95px'
         }}
           type={"file"}
          //  id={"csvFileInput"}
           accept={".csv"}
           onChange={handleOnChange}
         />
        {/* </label> */}
         <button
           onClick={(e) => {
             handleOnSubmit(e);
           }}
         >
           Upload
         </button>
       </form>
       
       <br />
 
       <table style={{
        border: '1px solid black',
        display: 'flex'
       }}>
         <thead>
           {/* <tr key={"header"}>
             {headerKeys.map((key) => (
               <th>{key}</th>
             ))}
           </tr> */}
           {/* <tr > */}
           <th>Name</th>
           <th>Email</th>
           <th>Phone number</th>
           {/* </tr> */}
         </thead>
 
         <tbody>
           {array.map((item) => (
             <tr key={item.id}>
               {Object.values(item).map((val) => (
                 <td>{val}</td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
     </div>
   );
 }

 export default Table