import React, { useState } from "react";
import Modal from "../modal/Modal";
import "./Loader.css";
import Preview from "../Preview/Preview";

const Loader = () => {
  //keeping different state for files ans modal-show
  //also storing file data,name,type in state for further use

  const [fileType, setFileType] = useState("application/pdf");
  const [fileInput, setInputFile] = useState();
  const [fileName, setFileName] = useState("");
  const [srcUrl, setSrcUrl] = useState("");
  const [status, setStatus] = useState("Not uploaded");
  const [modalShow, setModalShow] = useState(false);

  const handleFileType = (e) => {
    const selectedType = e.target.value;
    setFileType(selectedType);
    setStatus("Not uploaded");
  };

  const handleInput = (e) => {
    const file = e.target.files[0];
    let size = file.size;
    let type = file.type;

    if (type !== fileType) {
      alert(`kindly select the  ${fileType} type file`);
      e.target.value = "";
    } else {
      size /= 1000; //kb
      size /= 1024; //mb

      if (size > 10) alert("File size muust not exceed 10Mb");
      else {
        // if invalid valid selected
        if (fileType === "image/png" || fileType === "image.jpeg") {
          setSrcUrl(URL.createObjectURL(file));
        } else {
          var file_data = new Blob([file], { type: fileType });
          var fileURL = URL.createObjectURL(file_data);
          setSrcUrl(fileURL);
        }
        setFileName(file.name);
        setInputFile(file);
        setModalShow(true);
        e.target.value = "";
      }
    }
  };

  const handleStatus = () => {
    setStatus(`${fileName}  Uploaded`);
  };
  const handlePreview = (e) => {
    if (fileInput) {
      previewFile(fileInput, fileType);
    }
  };
  const handleModalShow = () => {
    setModalShow(false);
  };
  //for preview (raw file data , its type)
  const previewFile = (file, type) => {
    var file_data = new Blob([file], { type: type });
    var fileURL = URL.createObjectURL(file_data);
    var win = window.open();
    win.document.write(
      '<iframe src="' +
        fileURL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  };

  return (
    <div>
      <form
        id="form"
        className="form_container"
        onSubmit={(e) => e.preventDefault()}
      >
        <span className="dropdown">
          <label htmlFor="drop_down">Select file type </label>
          <select id="drop_down" onChange={handleFileType}>
            <option value="application/pdf">.pdf</option>
            <option value="image/jpeg">.jpeg</option>
            <option value="image/png">.png</option>
          </select>
        </span>
        <div>
          <label htmlFor="input">Browse file to upload..</label>
          <input
            type="file"
            accept={fileType}
            id="input"
            onChange={handleInput}
          />
        </div>
        <h4 onClick={handlePreview}>{status}</h4>
        {status !== "Not uploaded" ? (
          <Preview url={srcUrl} type={fileType} previewClick={handlePreview} />
        ) : (
          ""
        )}
      </form>

      {modalShow ? (
        <Modal
          previewSrc={srcUrl}
          type={fileType}
          fileName={fileName}
          onHandleStatus={handleStatus}
          onHandleCloseModal={handleModalShow}
          onHandlePreview={handlePreview}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Loader;
