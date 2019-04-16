import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    //handle the render error message
    renderError({ error, touched }) {
        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        //console.log(formProps);
        //console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    //when clicking the submit button
    onSubmit = formValue => {
        this.props.onSubmit(formValue);
    };

    render() {
        //console.log(this.props);
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter Title"
                />
                <Field 
                    name="description"
                    component={this.renderInput} 
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

//check whether users entered the right input
const validate = formValue => {
    const error = {};

    if(!formValue.title) {
        //only ran if the user did not enter a title
        error.title = 'You must enter a title.';
    }

    if(!formValue.description) {
        error.description = 'You must enter a description.';
    }

    return error;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);