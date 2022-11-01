import React, { Component } from "react";
import { showFormattedDate } from "../../utils";

class NoteList extends Component {
  constructor(props) {
    super(props);

    this.archiveChangeHandler = this.archiveChangeHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  archiveChangeHandler(id) {
    const { notes } = this.props;
    const targetNote = notes.find((note) => note.id === id);
    const archivedNotes = { ...targetNote, archived: true };
    console.log(archivedNotes);
    this.props.onArchivedNote(archivedNotes);
    // this.setState({ notes: newNotes });
  }

  onDeleteHandler(id) {
    const { notes } = this.props;
    const newNotes = notes.filter((note) => note.id !== id);
    this.props.onDeleteNote(newNotes);
    // this.setState({ notes: newNotes });
  }

  render() {
    const filtered = this.props.notes.filter((note) => note.archived === false);

    return (
      <div className="note-list">
        <div className="note-list__header">
          <h1>List Note</h1>
          <div className="note-list__header-action">
            <button onClick={this.props.openInput}>Buat note baru</button>
            <button className="arsip-btn" onClick={this.props.openArsip}>
              Buka Arsip
            </button>
          </div>
        </div>

        <div className="note-list__content">
          {this.props.isSearched === true &&
          this.props.searchedNotes.length > 0 ? (
            this.props.searchedNotes?.map((note) => (
              <div key={note.id} className="note-list__item">
                <h1>{note.title}</h1>
                <small>{showFormattedDate(note.createdAt)}</small>
                <p>{note.body}</p>
                <div className="note-list__item-action">
                  <button
                    onClick={() => {
                      console.log(note.id);
                      this.archiveChangeHandler(note.id);
                    }}
                  >
                    Arsipkan
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.onDeleteHandler(note.id)}
                  >
                    Hapus Note
                  </button>
                </div>
              </div>
            ))
          ) : this.props.searchedNotes.length === 0 &&
            this.props.isSearched === true ? (
            <p>Tidak ada data yang dicari</p>
          ) : null}

          {this.props.notes.length !== 0 && this.props.isSearched === false ? (
            filtered.length === 0 ? (
              <p>Tidak ada note</p>
            ) : (
              filtered?.map((note) => (
                <div key={note.id} className="note-list__item">
                  <h1>{note.title}</h1>
                  <small>{showFormattedDate(note.createdAt)}</small>
                  <p>{note.body}</p>
                  <div className="note-list__item-action">
                    <button
                      onClick={() => {
                        console.log(note.id);
                        this.archiveChangeHandler(note.id);
                      }}
                    >
                      Arsipkan
                    </button>
                    <button
                      className="delete"
                      onClick={() => this.onDeleteHandler(note.id)}
                    >
                      Hapus Note
                    </button>
                  </div>
                </div>
              ))
            )
          ) : this.props.notes.length === 0 &&
            this.props.isSearched === false ? (
            <p>Tidak ada notes</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default NoteList;
