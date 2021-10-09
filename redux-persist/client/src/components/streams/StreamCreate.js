import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions';
class StreamCreate extends React.Component {

    handleError = ( { error, touched } ) => {
        console.log( error )
        if ( touched && error ) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ( { input, label, meta } ) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''} `
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                <div>{this.handleError( meta )}</div>

            </div>
        )
    }
    onSubmit = ( formValues ) => {
        this.props.createStream( formValues );
    }


    render() {
        return (
            <form onSubmit={this.props.handleSubmit( this.onSubmit )} className="ui form error">
                <Field label="Enter Title" name="title" component={this.renderInput} />
                <Field label="Description" name="description" component={this.renderInput} />
                <button type="submit" className="ui button primary"> Submit</button>
            </form>
        );
    }
}

const validate = ( formValues ) => {
    console.log( formValues )
    const errors = {};
    if ( !formValues.title ) {
        errors.title = "You must enter a title";
    }
    if ( !formValues.description ) {
        errors.description = "You must enter a Description";
    }
    return errors;
}

const formWrapped = reduxForm( {
    form: 'streamCreate',
    validate
} )( StreamCreate );

export default connect( null, { createStream } )( formWrapped )