import React from 'react'

const Journals = ({journals, handleEditRef, handleDeleteRef}) => {

  const  handleEdit = (id) => {
    handleEditRef(id);  
  }

  const handleDelete = (id) => {
    handleDeleteRef(id);
  }

  return (
    <div className="container">
    <div className="row">
      {journals && journals.map((journal, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{journal.title}</h5>
              <p className="card-text">{journal.content}</p>
             
              <p className="card-text"><small className="text-muted">Last updated: {journal.date}</small></p>
              <button className="btn btn-primary"
                      onClick={()=>handleEdit(journal.id)}>
                        Edit
              </button>

              <button className="btn btn-danger ms-2"
                      onClick={() => handleDelete(journal.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Journals
