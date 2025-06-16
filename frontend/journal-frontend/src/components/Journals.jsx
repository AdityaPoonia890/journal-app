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
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary mb-3">{journal.title}</h5>
                <p className="card-text flex-grow-1">{journal.content}</p>
                {journal.base64Image && (
                  <div className="image-container mb-3">
                    <img 
                      src={`data:image/jpeg;base64,${journal.base64Image}`} 
                      alt="Journal Image" 
                      className="img-fluid rounded"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
                <p className="card-text text-muted mb-3">
                  <small>Last updated: {journal.date}</small>
                </p>
                <div className="d-flex gap-2 mt-auto">
                  <button 
                    className="btn btn-primary flex-grow-1"
                    onClick={() => handleEdit(journal.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger flex-grow-1"
                    onClick={() => handleDelete(journal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Journals
