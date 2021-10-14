import React from "react";

const Contact = () => {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <i className="fa fa-envelope"></i> Contact us.
      </div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="mx-auto">
            <button type="submit" className="btn btn-primary text-right">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
