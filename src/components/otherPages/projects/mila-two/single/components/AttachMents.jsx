import React from "react";

export default function AttachMents() {
  return (
    <>
      {" "}
      <h6 className="title fw-6">Brochure</h6>
      <div className="row">
        <div className="col-sm-6">
          <a href="#" target="_blank" className="attachments-item">
            <div className="box-icon w-60">
              <img
                alt="file"
                src="/images/home/file-1.png"
                width={40}
                height={40}
              />
            </div>
            <span>Mila Two</span>
            <i className="icon icon-download" />
          </a>
        </div>
      </div>
    </>
  );
}
