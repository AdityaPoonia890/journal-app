import React, {useState} from 'react'

const Input = ({onSubmitInput}) => {

    const [id, setId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(id);
        onSubmitInput(id);
    }
  return (
    <div className='container mb-5'> 
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Enter journal id</label>
            <input type="text" className="form-control" id="title" name="title" required
            value = {id}
            onChange = {(e) => setId(e.target.value)}/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  )
}

export default Input
