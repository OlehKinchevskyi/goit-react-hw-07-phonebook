import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactForm from './Components/ContactForm/ContactForm';
import Layout from './Components/Layout/Layout';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';
import { CSSTransition } from 'react-transition-group';
import Logo from './Components/Logo/Logo';
import operations from './redux/phoneBook/phoneBook-operations';
import Notification from './Components/Notification/Notification';
import selectors from './redux/phoneBook/phoneBook-selectors';

class App extends Component {

    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        fetchContacts: PropTypes.func,
        isLoadingContacts: PropTypes.bool,
        error: PropTypes.object
    };
   
    componentDidMount() {
        this.props.fetchContacts();
    }   
    
    render() {

        return (
            <Layout>
                <Logo />

                 {this.props.error &&
                    <Notification
                        message={`ERROR: ${this.props.error.message}.`} />}
                
                <ContactForm />
                    
                <Filter />
                
                <CSSTransition
                    in={this.props.contacts.length > 0}
                    timeout={0}
                    ommountOnExit>
                    <ContactList />
                </CSSTransition>

                
                
            </Layout>
        );
    };
};

const mapStateToProps = (state) => ({
    contacts: selectors.getAllContacts(state),
    isLoadingContacts: selectors.getLoading(state),
    error: selectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
    fetchContacts: () => dispatch(operations.fetchContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);