import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function About(props) {
  const a = useContext(noteContext);
  return (
    <div>
      <h1>About MyNoteBook</h1><br/>
       <h5>Welcome to MyNoteBook – your personalized space for organizing thoughts, ideas, and daily notes. MyNoteBook is designed to make note-taking a seamless experience, allowing users to create, manage, and customize their notes effortlessly.</h5>
       <br/>
      <h4>Key Features:</h4>
      <br/>
      <ul>
       <li><b>User-Friendly Interface:</b> MyNoteBook offers an intuitive and user-friendly interface, making it easy for users to navigate and interact with the application.</li>
       <br/>
       <li><b>Secure Login and Signup:</b> Create a personal account to securely log in and access your notes. Our authentication system ensures the privacy and security of your data.</li>
       <br/>
       <li><b>Note Management:</b> Write, edit, and delete notes with ease. Each note can include a title, description, and tag to help you organize and categorize your thoughts.</li>
       <br/>
       <li><b>Tagging System:</b> Use tags to categorize and filter your notes. This feature enables efficient organization and retrieval of information.</li>
       <br/>
       <li><b>Real-time Updates:</b> Changes made to your notes, such as edits or deletions, are reflected in real-time, ensuring that your information is always up-to-date.</li>
       <br/>
       <li><b>Effortless Note Editing:</b> Easily update your notes by clicking on the edit icon. The editing interface provides a seamless experience for modifying your notes.</li>
       <br/>
       <li><b>Responsive Design:</b> MyNoteBook is designed to be responsive, providing a consistent and enjoyable experience across various devices.</li>
</ul>
    </div>
  );
}