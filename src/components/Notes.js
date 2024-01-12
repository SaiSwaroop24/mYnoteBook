import React, { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
function Notes(props) {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
          getNotes();
    }
    else{
      navigate('/login');
    }
  }, [`node --trace-deprecation ...`]);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    //props.showAlert("Updated Sucessfully","success")
  };
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Sucessfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-success d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="container my-3">
                  <h2>Add Notes</h2>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        value={note.etitle}
                        aria-describedby="title"
                        required
                        minLength={2}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="edescription"
                        value={note.edescription}
                        required
                        minLength={5}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="etag"
                        value={note.etag}
                        onChange={onChange}
                      />
                    </div>

                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                ref={refClose}
                disabled={note.etitle.length<3 || note.edescription.length<5}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-success">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cont">
      <div className="container row  mb-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && <h5>'No Notes to display'</h5>}
        </div>
        {notes.map((note) => {
          return <Notesitem  key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
        })}
      </div>
      </div>
    </>
  );
}

export default Notes;
