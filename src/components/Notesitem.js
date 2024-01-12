import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
function Notesitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-header">{note.title}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{note.description}</p>
          </blockquote>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Sucessfully","success")}}></i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
}

export default Notesitem;
