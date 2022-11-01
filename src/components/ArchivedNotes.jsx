import React from "react";
import { showFormattedDate } from "../utils";

export default function ArchivedNotes(props) {
  const {
    showArsip,
    closeArsip,
    archivedNotes,
    notes,
    onDeleteNote,
    unArchiveChange,
  } = props;

  const newArchivedNotes = notes.filter((note) => {
    return note.archived === true;
  });

  function onDeleteHandler(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    console.log(newNotes);
    onDeleteNote(newNotes);
  }
  return (
    <div className={`arsip-note ${showArsip ? "show" : null}`}>
      <button className="close-arsip" onClick={closeArsip}>
        X
      </button>

      <div className="archived-wrapper">
        <div className="archived-list__header">
          <h1>Note yang Diarsipkan</h1>
        </div>

        <div className="archived-list__content">
          {newArchivedNotes.length !== 0 ? (
            newArchivedNotes?.map((note) => (
              <div key={note.id} className="archived-list__item">
                <h1>{note.title}</h1>
                <small>{showFormattedDate(note.createdAt)}</small>
                <p>{note.body}</p>
                <div className="archived-list__item-action">
                  <button
                    onClick={() => {
                      unArchiveChange(note.id);
                    }}
                  >
                    Buka Arsipan
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDeleteHandler(note.id)}
                  >
                    Hapus Note
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada note yang diarsipkan</p>
          )}
        </div>
      </div>
    </div>
  );
}
