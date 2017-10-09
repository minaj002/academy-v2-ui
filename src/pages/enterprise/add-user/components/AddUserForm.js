import React from 'react';
import {Field, reduxForm} from 'redux-form';
import CircularProgress from 'material-ui/CircularProgress';
import {
    Badge,
    DatePicker,
    GridList,
    GridTile,
    IconButton, RaisedButton,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TextField
} from "material-ui";
import InputTextField from "../../../../components/InputTextField";
import MenuItem from 'material-ui/MenuItem';
import { SelectField } from 'redux-form-material-ui';

const validate = values => {
    const errors = {};
    return errors;
};

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        // width: 500,
        // height: 450,
        overflowY: 'auto',
    },
    gridTile: {
        width: 250,
        height: 100,
        overflowY: 'auto',
    },
};


const AddUserForm = props => {

    const { handleSubmit, pristine, isFetching, sections } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">

                <div className="field" >
                    <Field name="firstName" component={InputTextField}
                           label="First Name" />
                </div>
                <div className="field">
                    <Field name="lastName" component={InputTextField} label="Last name" />
                </div>
                <div className="field">
                    <Field name="dateOfBirth" component={InputTextField} label="Date of birth" />
                </div>
                <div className="field">
                    <Field name="email" component={InputTextField} label="Email" />
                </div>
                <div className="field">
                    <Field name="phone" component={InputTextField} label="Phone" />
                </div>
                <div className="field">
                    <Field name="street" component={InputTextField} label="Street" />
                </div>
                <div className="field">
                    <Field name="city" component={InputTextField} label="City" />
                </div>
                <div className="field">
                    <Field name="section" component={SelectField} floatingLabelText="Section">
                        {sections && sections.sections && sections.sections.map(x => <MenuItem key={x.id} value={x} primaryText={x.name}/>)}
                    </Field>
                </div>
            </div>

            {!isFetching &&
            <RaisedButton

                type="submit"
                primary
                label="Login"
                fullWidth
            />
            }
            {isFetching &&
            <CircularProgress className="circular-progress-40"/>
            }


        </form>
    );

};

export default reduxForm({
    form: 'add-user',
    validate,
})(AddUserForm)