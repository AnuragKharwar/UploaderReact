import React from "react";

const Preview = ({ url, type, previewClick }) => {
  return (
    <div className="container">
      {type === "application/pdf" ? (
        <embed src={url} alt="pdf"></embed>
      ) : (
        <img src={url} alt="preview" onClick={previewClick}></img>
      )}
    </div>
  );
};

export default Preview;
