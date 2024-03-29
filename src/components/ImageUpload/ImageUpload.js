import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import axios from 'axios';
import { MdFileUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ImageUpload.css';

toast.configure();

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 20,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
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
        setShowResult(true);
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
    setShowResult(false);
  }

  return (
    <div className="upload-container">
      {result ? (
        <>
          <Confetti active={ showResult } config={ config } />
          <div className="result-container">
            {!showResult && <img src={imageUrl} alt="Uploaded" className="uploaded-image" />}
            {showResult && <img src={`/images/${result}.jpg`} alt="Result" className="result-image" />}
          </div>
          <h2>Congratulations! You are a <span className={result==='Floppa'?'floppa':'bingus'}>{result}!</span></h2>
          <button type="button" onClick={reset}>Try again</button>
        </>
      ) : (
        <>
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
              {!loading && (
                <label className="upload-label" htmlFor="file-upload">
                  <input id="file-upload" type="file" onChange={onFileChange} style={{ display: 'none' }} />
                  Choose another file
                </label>
              )}
            </>
          ) : (
            <label className="upload-label" htmlFor="file-upload">
              <input id="file-upload" type="file" onChange={onFileChange} style={{ display: 'none' }} />
              <MdFileUpload size={100} className="upload-icon" />
            </label>
          )}
          {file && (
            <button type="button" onClick={onFileUpload} disabled={!file || loading}>
              {loading ? <div className="spinner" /> : 'Upload'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ImageUpload;