import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../Styles/Contact.css"

class Contact extends React.Component {

  render() {
    return (
      <div class="prm-background">
        <form className='contact-form'>
          <div class="form-group">
            <label >Request summary</label>
            <input type="email" class="form-control" ></input>
            <small id="emailHelp" class="form-text text-muted">A short description of your request</small>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">How can we help you?</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <small id="emailHelp" class="form-text text-muted">Tell us how can we help you in a few more words</small>
          </div>
          <Button className='scripts-btn' type="submit" >Submit</Button>
        </form>
      </div>
    );
  }
}

export default Contact;