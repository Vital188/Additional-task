import React, { useState } from "react";
 
 function Table() {
   const [file, setFile] = useState();
   const [array, setArray] = useState([]);
   const [indicator, setIndicator] = useState(0)
   const [secondColor, setSecondColor] = useState('green');
   const [thirdColor, setThirdColor] = useState('green')
  
   const fileReader = new FileReader();
 
   const handleOnChange = (e) => {
     setFile(e.target.files[0])
     setSecondColor('yellow');
   };
 
   const csvFileToArray = string => {
     const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
     const csvRows = string.slice(string.indexOf("\n")+1).split("\n");
 
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
       setIndicator(1);
       setThirdColor('crimson');
     }
   };

   const handleRemove = () => {
    setArray([]);
    setIndicator(0);
    setSecondColor('green');
    setThirdColor('green');
   }
 
   const headerKeys = Object.keys(Object.assign({}, ...array));

   let additional = array.pop();
   
   return (
     <div style={{ 
      width: '98%',
      height: 'auto',
      textAlign: "center", 
      border: '1px solid black',
      marginTop: '6px',
      marginBottom: '6px'
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
        backgroundColor: secondColor
       }}></div>
       <div className="oval" style={{
        backgroundColor: thirdColor
       }}> </div>
       </div>
       <div style={{
        fontSize: '40px',
        marginLeft: '496px',
        fontFamily: 'Sofia, sans-serif'
       }}>CSV uploader </div>
       </div>
       <div className="inside">
       <form>
       <label for="files" class="btn">Select file...</label>
          <input style={{
          marginLeft: '95px',visibility:'hidden'
         }}
           type={"file"}
           accept={".csv"}
           id="files"
           onChange={handleOnChange}
         />
         <button style={{
          fontFamily: 'Candal'
         }}
           onClick={(e) => {
             handleOnSubmit(e);
           }}
         >
           Upload
         </button>
       </form>
       
       <br />
 
       <table style={{
        width: '900px',
        tableLayout: 'fixed' 
       }}>
         <thead style={{
          backgroundColor: '#9E9E9E',
          color: 'white'
         }}>
           <tr key={"header"}>
             {headerKeys.map((key) => (
               <th>{key}</th>
             ))}
           </tr>
         </thead>
 
         <tbody>
           {array.map((item) => (
             <tr key={item.id} style={{
              backgroundColor: '#E6E6E6'
             }}>
               {Object.values(item).map((val) => (
                 <td>{val}</td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
       {indicator === 1 ?
       <button style={{
          fontFamily: 'Candal',
          backgroundColor: 'crimson',
          marginBottom: '10px'
         }}
           onClick={() => {
             handleRemove();
           }}
         >
           Delete
         </button> : null}
     </div>
     </div>
   );
 }
 
 export default Table