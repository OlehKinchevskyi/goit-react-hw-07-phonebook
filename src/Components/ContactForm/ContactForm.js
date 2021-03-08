import React, { Component } from 'react';
import { connect } from 'react-redux';
import operations from '../../redux/phoneBook/phoneBook-operations';
import selectors from '../../redux/phoneBook/phoneBook-selectors';
import Notification from '../../Components/Notification/Notification';
import PropTypes from 'prop-types';
import './ContactForm.scss';

 class ContactForm extends Component {
    state = {
        name: '',
        number: '',
        message: null
    };

    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        onSubmit: PropTypes.func,
    };

    setMassge = (note) => {
      this.setState({ message:  note});
      setTimeout(() => {
      this.setState({ message: null });
      }, 2500);
    }

     handleChange = e => {
        const { name, value } = e.target;
            this.setState({
                [name]: value,
            });
    };

    
    handleSubmit = e => {
        const { name, number } = this.state;
        e.preventDefault();

        if (name === '') {
            this.setMassge('Enter contact name, please!');
            return;
        }
        if (number === '') {
            this.setMassge('Enter concact phone, please!');
            return;
        }
        if (this.props.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
            this.setMassge('Contact already exists!');
            return;
        } 

        this.props.onSubmit(name, number);
        this.setState({
            name: '',
            number: ''
            });
    }; 
    
     render() {
        const { name, number, message } = this.state;
        return (
            <div>
                <Notification
                    message={message} />
                <form
                    className="Form"
                    onSubmit={this.handleSubmit} >
                    <label
                        htmlFor="name"
                        className="Label">Name</label>
                <input
                    type="text"
                    value={name}
                    id="name"
                    className="Input"
                    onChange={this.handleChange}
                    name="name"
                    />
            
                    <label
                        htmlFor="number"
                        className="Label">Number</label>
                <input
                    type="tel"
                    value={number}
                    id="number"
                    className="Input"
                    onChange={this.handleChange}
                    name="number"
                    />
                    
                    <button
                        type="submit"
                        className="ContactFormButton">
                      Add contact
                    </button>
                 </form>
            </div>
        );
    }
 }

const mapStateToProps = (state) => ({
    contacts: selectors.getAllContacts(state),
})
     
const mapDispatchToProps = dispatch => ({
    onSubmit: (name, number) => dispatch(operations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);