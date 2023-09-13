import React from "react";
import "./modal.css";
import Preview from "./Preview/Preview";
const Modal = ({
  previewSrc,
  type,
  fileName,
  onHandleStatus,
  onHandlePreview,
  onHandleCloseModal,
}) => {
  const previewhanlder = (e) => {
    onHandlePreview(e);
  };
  const upload = () => {
    onHandleStatus();
    closeModal();
  };

  const CloseConatiner = (e) => {
    if (e.target.className === "modal_container") {
      closeModal();
    }
  };

  const closeModal = () => {
    onHandleCloseModal();
  };

  return (
    <div className="modal_container" onClick={(e) => CloseConatiner(e)}>
      <div className="modal_content">
        <Preview url={previewSrc} type={type} previewClick={previewhanlder} />
        <p>{fileName}</p>
        <button className="btn" onClick={(e) => previewhanlder(e)}>
          Preview
        </button>
        <button className="btn" onClick={upload}>
          Upload
        </button>
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
