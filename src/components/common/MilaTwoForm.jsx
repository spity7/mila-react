import React, { useEffect, useRef, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import { useNavigate } from "react-router-dom";
import AdvanceSearch from "./AdvanceSearch";
import { filterOptions } from "@/data/propertiesMila";

export default function MilaTwoForm({
  ddContainer,
  advanceBtnRef,
  styleClass = "",
}) {
  const [selectedType, setSelectedType] = useState(filterOptions[0]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/mila-two?type=${encodeURIComponent(selectedType)}`);
  };

  return (
    <div className="tab-content">
      <div className="tab-pane fade active show" role="tabpanel">
        <div className="form-sl">
          <form onSubmit={handleSubmit}>
            <div className={`wd-find-select ${styleClass}`}>
              <div className="inner-group">
                <div className="form-group-1 search-form form-style">
                  <label>Type</label>
                  <div className="group-select">
                    <DropdownSelect
                      options={filterOptions}
                      value={selectedType}
                      onChange={setSelectedType}
                    />
                  </div>
                </div>
                <div className="form-group-2 form-style">
                  <label>Location</label>
                  <div className="group-select">
                    <DropdownSelect options={["Tyre"]} />
                  </div>
                </div>
              </div>
              <div className="box-btn-advanced">
                <button type="submit" className="tf-btn btn-search primary">
                  Search <i className="icon icon-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
