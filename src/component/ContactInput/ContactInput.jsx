import React from "react";

class ContactInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      tag: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addContact(this.state);
  }

  render() {
    return (
      <form
        className="contact-input"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nama..."
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="tag"
          id="tag"
          placeholder="Tag..."
          value={this.state.tag}
          onChange={this.handleChange}
        />
        <input type="submit" value="Tambah" />
      </form>
    );
  }
}

export default ContactInput;
