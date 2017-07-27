/**
 * Created by artis on 20/07/2017.
 */

import React, { Component } from 'react';
import { setTitle } from '../../../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import Card, {CardActions} from 'material-ui/Card';
import { connect } from 'react-redux';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import { grey500, cyan500 } from 'material-ui/styles/colors';
import { submit } from 'redux-form';
import Form from './form';
import LoadingRaisedButton from '../../../../components/LoadingRaisedButton';
import '../signup.css';
import { SubmissionError } from 'redux-form';



class SignUpConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
    }

    componentWillMount() {
        this.props.dispatch(setTitle("Confirm signup"))
    }


    handleSubmit = () => {
        this.props.dispatch(submit('signup-confirm'));
    };

    setValid = (valid) => {
        this.setState({valid: valid});
    };

    render() {

        const { isFetching } = this.props;

        const iconStyle = {
            color: this.state.valid ? cyan500 : grey500
        };

        return (
            <div id="signup-confirm" className="push-middle">

                <Card className="card">
                    <div className="check-wrapper">
                        <CheckCircle style={iconStyle} className="check-icon" />
                    </div>
                    <Form setValid={this.setValid} />
                    <CardActions>
                        <LoadingRaisedButton
                            onTouchTap={() => this.handleSubmit()}
                            type="submit"
                            primary
                            label="Confirm"
                            fullWidth
                            isFetching={isFetching}
                            disabled={!this.state.valid || isFetching}
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isFetching: state.businessSignup.isFetching,
    //error: state.businessSignup.error
});

export default connect(mapStateToProps) (SignUpConfirm);
