import React, { Component } from "react";
import { getInitialData } from "../utils";
import Header from "./Header";
import { NoteInput } from "./NoteInput";
import { NoteList } from "./NoteList";

export default class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      notArchivedNotes: "",
      archivedNotes: "",
      searchedNotes: "",
      show: false,
      isSearched: false,
      showArsip: false,
    };

    this.openInputHandler = this.openInputHandler.bind(this);
    this.openArsipHandler = this.openArsipHandler.bind(this);
    this.closeArsipHandler = this.closeArsipHandler.bind(this);
    this.onCloseInputHandler = this.onCloseInputHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchivedNoteHandler = this.onArchivedNoteHandler.bind(this);
    this.unArchiveChangeHandler = this.unArchiveChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
  }

  openInputHandler = () => {
    if (!this.state.show) {
      this.setState((prevState) => {
        return {
          ...prevState,
          show: true,
        };
      });
    }
  };

  onCloseInputHandler = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        show: false,
      };
    });
  };

  openArsipHandler() {
    if (!this.state.showArsip) {
      this.setState((prevState) => {
        return {
          ...prevState,
          showArsip: true,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          showArsip: false,
        };
      });
    }
  }

  closeArsipHandler() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showArsip: false,
      };
    });
  }

  onDeleteNoteHandler(newNote) {
    this.setState((prevState) => {
      return {
        ...prevState,
        notes: newNote,
      };
    });
  }

  onArchivedNoteHandler(newNote) {
    const newArchivedNotes = this.state.notes.map((note) => {
      if (note.id === newNote.id) {
        note.archived = true;
      }
      return note;
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        archivedNotes: [...prevState.archivedNotes, newNote],
        notes: newArchivedNotes,
      };
    });
  }

  unArchiveChangeHandler(id) {
    const findNote = this.state.notes.find((note) => note.id === id);

    const newArchivedNotes = this.state.notes.map((note) => {
      if (note.id === id) {
        note.archived = false;
      }
      return note;
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        notArchivedNotes: [...prevState.notArchivedNotes, findNote],
        notes: newArchivedNotes,
      };
    });
  }

  onSearchHandler(input) {
    this.setState((prevState) => {
      return {
        ...prevState,
        isSearched: true,
      };
    });
    if (input.length !== 0) {
      const patokan = input.toLowerCase();
      const searchNote = this.state.notes.filter((note) =>
        note.title.toLowerCase().includes(patokan)
      );
      this.setState((prevState) => {
        return {
          ...prevState,
          searchedNotes: searchNote,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          isSearched: false,
        };
      });
    }
  }

  onSubmitNoteHandler(newNote) {
    this.setState((prevState) => {
      return {
        ...prevState,
        show: false,
        notes: [...prevState.notes, newNote],
      };
    });
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearchHandler}
          showArsip={this.state.showArsip}
          openArsip={this.openArsipHandler}
          closeArsip={this.closeArsipHandler}
          archivedNotes={this.state.archivedNotes}
          notes={this.state.notes}
          onDeleteNote={this.onDeleteNoteHandler}
          unArchiveChange={this.unArchiveChangeHandler}
        />
        <div className="container">
          {this.state.show && (
            <NoteInput
              onClose={this.onCloseInputHandler}
              onSubmitNote={this.onSubmitNoteHandler}
            />
          )}
          <NoteList
            notes={this.state.notes}
            searchedNotes={this.state.searchedNotes}
            isSearched={this.state.isSearched}
            openInput={this.openInputHandler}
            onDeleteNote={this.onDeleteNoteHandler}
            onArchivedNote={this.onArchivedNoteHandler}
            openArsip={this.openArsipHandler}
          />
        </div>
      </div>
    );
  }
}
