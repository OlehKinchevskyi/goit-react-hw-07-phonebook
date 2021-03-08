import React, { Component } from 'react';
import * as phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Notification.scss';
import selectors from '../../redux/phoneBook/phoneBook-selectors';


class Notification extends Component {
    static propTypes = {
        message: PropTypes.string,
        error: PropTypes.object,
        clearError: PropTypes.func
    };
   
   
    componentDidMount() {
        if (this.props.error) {
            setTimeout(() => {
                this.props.clearError();
            }, 2500);
        }
    }

    render() {

        return (
             <CSSTransition
            in={this.props.message}
            timeout={250}
            classNames="Notification-fade"
            unmountOnExit>
            
        <div className="Overlay">
        <p className="Notification">
            {this.props.message}
        </p>
        </div>
        </CSSTransition>
        );
    };
}

const mapStateToProps = (state) => ({
    error: selectors.getError(state),
})

const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(phoneBookActions.clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);