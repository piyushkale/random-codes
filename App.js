import React, { useCallback, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
function App() {
  const itemDrag = useRef();

  // Creating array container for storing the notes
  const [arrElement, setarrElement] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedtxt,setEditedtxt]=useState()
  const [inputValidate, setInputValidate] = useState("");
  const addRef = useRef();
  const titleRef = useRef();
  const editRef=useRef()

  // funtion for adding element
  const addElement = (ele) => {
    if (ele[0].length !== 0 && ele[1].length !== 0) {
      setarrElement((arrElement) => [[ele[0], ele[1]], ...arrElement]);
      setInputValidate("");
    } else {
      setInputValidate("Add both fields to create note*");
    }
  };

  // function for editing element

  const editNote=useCallback((k,elem,index)=>{
    if (k.key === "Enter") {
      console.log(editRef.current.value);
     setEditedtxt(editRef.current.value);
     setEdit(false)
    }
  },[editRef])

  // function for deleting element
  const deleteElement = (elem) => {
    setarrElement(arrElement.filter((ele) => ele !== elem));
  };

  return (
    <div
      ref={itemDrag}
      className="flex flex-col justify-center items-center min-w-screen min-h-screen text-xl bg-[#363433] overflow-hidden"
    >
      <h1 className="absolute top-[0] left-0 z-10 bg-black/80 ml-3 p-2 rounded-lg text-2xl font-semibold text-[linen] ">
        {" "}
        Sticky Notes 📋
      </h1>
      <div
        className="z-20 flex flex-col gap-3 bg-black/20 border-[1px] p-4 rounded-lg"
        style={{ filter: "drop-shadow(#534d42 6px -13px 20px)" }}
      >
        <span className="text-[#c59666] text-lg">{inputValidate}</span>
        <input
          className="px-1 text-cyan-50 bg-transparent border-b-2 border-indigo-400 focus:outline-indigo-500"
          type="text"
          ref={titleRef}
          placeholder="Enter title here"
        />
        <input
          className="px-1 text-cyan-50 bg-transparent border-b-2 border-indigo-400 focus:outline-indigo-500"
          type="text"
          ref={addRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addElement([
                `${titleRef.current.value}`,
                `${addRef.current.value}`,
              ]);
              titleRef.current.value = null;
              addRef.current.value = null;
            }
          }}
          placeholder="Enter text here"
        />
        <button
          className="bg-[#e4c899] font-bold text-lg rounded-lg text-[#2c2c2c]"
          onClick={() => {
            addElement([
              `${titleRef.current.value}`,
              `${addRef.current.value}`,
            ]);

            titleRef.current.value = null;
            addRef.current.value = null;
          }}
        >
          ADD ➕
        </button>
      </div>
      <motion.ul className="flex flex-row justify-center flex-wrap items-center gap-5">
        {arrElement.map((elem,index) => (
          <motion.li
            key={arrElement.indexOf(elem)}
            whileDrag={{ scale: 1.2, cursor: "grabbing" }}
            drag
            dragConstraints={itemDrag}
            dragElastic={0.1}
            className="flex justify-between my-4 flex-col w-[18rem] min-h-[9rem] items-center border-1 border-gray rounded-lg bg-[#1b1b1b]"
          >
            <h1 className="w-full text-[#232323] font-semibold bg-[#ffcd75]">
              {elem[0]}
            </h1>
            {edit &&
              <textarea
                type="text"
                defaultValue={editedtxt || elem[1]}
                ref={editRef}
                onKeyDown={(k) =>{ editNote(k,index)}}
                rows={4} cols={25}
              />}
            
              <h1 className="w-full px-3 text-[#b5b5b5]">{editedtxt || elem[1] }</h1>
            
           
            <button
              title="Edit note"
              className="text-xl text-neutral-500  self-end pr-2 pb-2"
              onClick={() => {
               setEdit(true)
              }}
            >
              <span role="img" aria-label="EDIT NOTE" className="text-base">
                ✏️
              </span>
            </button>
            <button
              title="Delete note"
              className="text-xl text-neutral-500  self-end pr-2 pb-2"
              onClick={() => {
                deleteElement(elem);
              }}
            >
              <span role="img" aria-label="REMOVE NOTE" className="text-base">
                🗑️
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default App;
