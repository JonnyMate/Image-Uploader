import React from "react";

const ImageUploadRender = props => {
  return (
    <div>
      <div className="container">
        <div className="progress">
          <h1>Upload an image!</h1>
          <progress value={props.data.progress} />
        </div>
        <div className="upload">
          <input type="file" onChange={props.handleChange} />
          <button onClick={props.handleUpload}>Upload</button>
        </div>
        {props.data.noUpload && <h2 className="no-upload">No file selected</h2>}
      </div>
      <div className="image">
        {props.data.url && <img src={props.data.url} alt="Uploaded file" />}
      </div>
    </div>
  );
};

export default ImageUploadRender;
