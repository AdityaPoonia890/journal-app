import React, {useState} from 'react'
import { getJournalById, postJournal, updateJournal } from '../service/UserService';

const CreateJournal = ({onSubmit, id}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (id) {
      getJournalById(id).then(
        (response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      ).catch(error => console.log("error while getting journal by id for updation, " + error));
    }

    const handleSubmit = (e) => {

      if (id) {
        console.log("updating jounal with id: ", id);

        e.preventDefault();
        const post = {id, title, content};

        updateJournal(id, post).then(
          (response) => {
            alert("Journal updated successfully")
            onSubmit();
          }
        ).catch(error => {
          console.log(error)
          alert("Journal updation failed")
        })


      } else{
        console.log("creating new journal with id: ", id);
        e.preventDefault();
        const post = {title, content};

        postJournal(post).then(
            (response) => {
                alert("Journal created successfully")
                onSubmit();
            }
        ).catch(error => {
            console.log(error)
            alert("Journal creation failed")
        })
      }

       
    }

  return (
    <div className='container mb-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="journalTitle" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="journalTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="titleHelp"
            placeholder="Enter title"
          />
          <small id="titleHelp" className="form-text text-muted">Enter title for journal.</small>
        </div>
        
        <div className="mb-3">
          <label htmlFor="journalContent" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="journalContent"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateJournal
