import React, { useState } from 'react';
import axios from 'axios';
import { MdFileUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ImageUpload.css';

toast.configure();

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  const onFileUpload = async () => {
    if (!file) {
      // Show a pop-up error message
      toast.error('Please select a file before clicking Upload.');
      return;
    }  
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await axios.post('http://10.0.0.22:5000/predict', formData);
      const { prediction } = data;
      if (prediction === 'Floppa' || prediction === 'Bingus') {
        setResult(prediction);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (e) {
      toast.error('Error connecting to server.');
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setFile(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="upload-container">
      {result ? (
        <>
          <div className="result-container">
            <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
            <img src={`/images/${result}.jpg`} alt={result} className="result-image" />
          </div>
          <h2>Congratulations! You are a {result}!</h2>
          <button type="button" onClick={reset}>Try again</button>
        </>
      ) : (
        <>
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
              <label className="upload-label" htmlFor="file-upload">
                <input id="file-upload" type="file" onChange={onFileChange} style={{ display: 'none' }} />
                Choose another file
              </label>
            </>
          ) : (
            <label className="upload-label" htmlFor="file-upload">
              <input id="file-upload" type="file" onChange={onFileChange} style={{ display: 'none' }} />
              <MdFileUpload size={100} className="upload-icon" />
            </label>
          )}
          <button type="button" onClick={onFileUpload} disabled={!file || loading}>
            {loading ? <div className="spinner" /> : 'Upload'}
          </button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ImageUpload;