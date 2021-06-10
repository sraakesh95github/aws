import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);
    this.setState({
      name: "",
      email: "",
      message: "",
    });
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          {/* Name entry */}
          <div className="form-group">
            <label>Name</label>
          </div>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.onChange}
            value={name}
          />

          {/* Email entry */}
          <div className="form-group">
            <label>Email</label>
          </div>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={this.onChange}
            value={email}
          />

          {/* Message entry */}
          <div className="form-group">
            <label>Message</label>
          </div>
          <input
            className="form-control"
            type="message"
            name="message"
            onChange={this.onChange}
            value={message}
          />

          {/*Submit button*/}
          <div className="form-group mt-4  justify-content-center text-center">
            <button type="submit" className="btn btn-primary col-12">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
