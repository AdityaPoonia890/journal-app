import React, { useState, useEffect } from 'react';
import { getJournalById, postJournal, updateJournal } from '../service/UserService';
import axios from 'axios';

const CreateJournal = ({ onSubmit, id }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      console.log('before setting title and content');
      getJournalById(id)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setImage(response.data.image);
        })
        .catch((error) => console.log('error while getting journal by id for updation, ' + error));
    }
  }, [id]);

  // Function to handle the POST request using axios
  const handleSubmit = (e) => {
    e.preventDefault();

    const journalData = { title, content, image };

    // Check if we are updating or creating a new journal
    if (id) {
      console.log('Updating journal with id:', id);

      // If updating, use updateJournal API
      const post = { id, title, content, image };
      updateJournal(id, post)
        .then((response) => {
          alert('Journal updated successfully');
          onSubmit();
        })
        .catch((error) => {
          console.log(error);
          alert('Journal updation failed');
        });
    } else {
      console.log('Creating new journal');

      // Use the same pattern as update - through service
      // Or use the direct axios call with better error handling
      sendPostRequest(journalData, (error, response) => {
        if (error) {
          console.error('Error details:', error);
          alert('Failed to create journal: ' + (error.response?.data?.message || error.message));
        } else {
          alert('Journal created successfully: ' + response.title);
          onSubmit();
        }
      });
    }
  };

  // Function to send POST request via axios with a callback
  const sendPostRequest = (journalData, callback) => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      callback(new Error('No authentication token found. Please login again.'), null);
      return;
    }

    // Create a FormData instance to send data with the image file
    const formData = new FormData();
    formData.append('title', journalData.title);
    formData.append('content', journalData.content);
    if (journalData.image) {
      formData.append('image', journalData.image);
    }

    // Make the POST request using axios
    axios
      .post('https://journal-app-1-pge0.onrender.com/journal', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Authorization header with JWT token
          // Don't set Content-Type manually for FormData - let axios set it with boundary
        },
      })
      .then((response) => {
        // If the request is successful, invoke the callback with the response
        console.log('Journal created successfully:', response.data);
        callback(null, response.data); // Pass the response data to the callback
      })
      .catch((error) => {
        // If there's an error, invoke the callback with the error
        console.error('Error creating journal:', error);
        
        // Handle specific error cases
        if (error.response) {
          // Server responded with error status
          console.error('Server error:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Network error:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
        
        callback(error, null); // Pass the error to the callback
      });
  };

  return (
    <div className="container mb-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="journalTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="journalTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="titleHelp"
            placeholder="Enter title"
            required
          />
          <small id="titleHelp" className="form-text text-muted">
            Enter title for journal.
          </small>
        </div>

        <div className="mb-3">
          <label htmlFor="journalContent" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="journalContent"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="journalImage" className="form-label">
            Image (optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="journalImage"
            onChange={(e) => setImage(e.target.files[0])}
            aria-describedby="imageHelp"
            accept="image/*"
          />
          <small id="imageHelp" className="form-text text-muted">
            Upload an image for your journal entry.
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'} Journal
        </button>
      </form>
    </div>
  );
};

export default CreateJournal;