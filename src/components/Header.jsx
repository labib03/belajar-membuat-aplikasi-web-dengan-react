import React from "react";
import ArchivedNotes from "./ArchivedNotes";

function Header(props) {
  const {
    onSearch,
    showArsip,
    openArsip,
    closeArsip,
    archivedNotes,
    notes,
    onDeleteNote,
    unArchiveChange,
  } = props;
  return (
    <div className="header">
      {/* <div className={`arsip-note ${showArsip ? "show" : null}`}>
        <button className="close-arsip" onClick={closeArsip}>
          X
        </button>
      </div> */}
      <ArchivedNotes
        showArsip={showArsip}
        closeArsip={closeArsip}
        archivedNotes={archivedNotes}
        notes={notes}
        onDeleteNote={onDeleteNote}
        unArchiveChange={unArchiveChange}
      />
      <div className="menus">
        <h1>Note APP</h1>
        <p onClick={openArsip}>Arsip</p>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Cari Notes ..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Header;
