import React, { Component } from "react";

export default class NoteInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: 50,
      input: {
        title: "",
        text: "",
      },
    };

    this.textareaHandleChange = this.textareaHandleChange.bind(this);
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(e) {
    console.log("title: ", this.state.input.title);
    const text = e.target;
    const maxInput = 50;
    const character = maxInput - text.value.length;
    if (character <= 0) {
      text.value = text.value.substring(0, maxInput);
    }
    if (character >= 0) {
      this.setState((prevState) => {
        return {
          character: character,
          input: {
            ...prevState.input,
            title: text.value,
          },
        };
      });
    }
  }

  textareaHandleChange(event) {
    const textarea = event.target;
    this.setState({
      input: {
        ...this.state.input,
        text: textarea.value,
      },
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const newNote = {
      id: +new Date(),
      title: this.state.input.title,
      body: this.state.input.text,
      archived: false,
      createdAt: new Date(),
    };
    this.props.onSubmitNote(newNote);
  }

  render() {
    return (
      <div className="note-input">
        <h1>Tambah Note</h1>
        <button className="close" onClick={this.props.onClose}>
          X
        </button>
        <div className="note-input__input">
          <form>
            {" "}
            <input
              className="text"
              name="title"
              type="text"
              placeholder="Judul"
              // value={this.state.input.title}
              onChange={this.onTitleChangeHandler}
            />
            <textarea
              className="textarea"
              cols="30"
              rows="10"
              placeholder="Isi notes ..."
              onChange={this.textareaHandleChange}
            />
            {this.state.character === 0 ? (
              <span>Sudah maksimal</span>
            ) : (
              <span>Tersisa {this.state.character} karakter</span>
            )}
            <input
              className="submit"
              type="submit"
              value="tambah"
              onClick={this.onSubmitHandler}
            />
          </form>
        </div>
      </div>
    );
  }
}
