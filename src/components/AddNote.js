import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>
        {`
          .note-form {
            max-width: 400px;
            width: 100%;
          }

          .note-container {
            max-width: 400px;
            margin-left: 40px;
            margin-top: 40px;
          }

          img {
            width:600px;
            margin-top:-380px;
            margin-left:600px;
          }
        `}
      </style>

      <div>
        <div className="note-container my-3">
          <h2>Add Your Notes</h2>
          <br />
          <form className="note-form">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="title"
                value={note.title}
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
                name="description"
                onChange={onChange}
                value={note.description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                name="tag"
                onChange={onChange}
                value={note.tag}
              />
            </div>

            <button
              disabled={note.title.length < 3 || note.description.length < 5}
              type="submit"
              className="btn btn-success"
              onClick={handleClick}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
      <div className="note-image">
        <a
          href="https://storyset.com/illustration/programming/rafiki#088940FF&hide=&hide=complete"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://stories.freepiklabs.com/api/vectors/webinar/pana/render?color=088940FF&background=complete&hide="
            alt="Web Illustration"
          />
        </a>
      </div>
    </>
  );
}

export default AddNote;
