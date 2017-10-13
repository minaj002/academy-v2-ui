import React from 'react';
import {Field, reduxForm} from 'redux-form';
import CircularProgress from 'material-ui/CircularProgress';
import {
    AutoComplete,
    Badge,
    Card,
    CardActions,
    CardHeader,
    CardText,
    CardTitle,
    DatePicker,
    FlatButton,
    FloatingActionButton,
    GridList,
    GridTile,
    IconButton,
    IconMenu,
    MenuItem,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TextField
} from "material-ui";
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
        overflowY: 'auto',
    },
    gridTile: {
        width: '90%',
        height: 500,
        overflowY: 'auto',
        padding: 10,
        textAlign: 'center'
    },
    gridTileSmall: {
        width: 150,
        height: 80,
        overflowY: 'auto',
    },
};

const PaymentsForm = props => {

    const {isFetching, payments, clickToSeePayments, chooseMonth} = props;


    return (
        <form>
            <div className="form" style={styles.root}>
                <GridList
                    cols={5}
                    cellHeight={'auto'}
                    padding={3}
                    style={styles.gridList}
                >

                    <GridTile
                        key='classes'
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        actionPosition="left"
                        titlePosition="top"
                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        cols={2}
                        rows={1}
                        style={styles.gridTile}
                    >
                        <div className="field">
                            <DatePicker hintText="Choose month" onChange = {chooseMonth} defaultDate={new Date()}
                                        formatDate={new Intl.DateTimeFormat().format}
                            />
                            <Card>
                                {payments && payments.payments && <Table>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Total for Month: {payments.payments.reduce((sum, value) => sum + value.amount, 0)}
                                            </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                                        {payments.payments.map((row, index) => (
                                            <TableRow key={index} value ={row} onMouseDown={() => {
                                                clickToSeePayments(row)
                                            }}>
                                                <TableRowColumn>{ payments.members.find(member => {
                                                    return member.id === row.memberId;
                                                }) ? payments.members.find(member => {
                                                    return member.id === row.memberId;
                                                }).firstName + ' ' + payments.members.find(member => {
                                                    return member.id === row.memberId;
                                                }).lastName : '' }</TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                }
                            </Card>
                        </div>
                    </GridTile>
                    <GridTile
                        key='checked-head'
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        actionPosition="left"
                        titlePosition="top"
                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        cols={3}
                        rows={1}
                        style={styles.gridTile}
                    >
                        <div className="field">
                            <Card>
                                {payments.selected &&
                                <CardHeader
                                    title={payments.selected.firstName + ' ' + payments.selected.lastName}
                                    actAsExpander={true}
                                    showExpandableButton={false}
                                />
                                }
                                {payments.paymentsForMember &&

                                <Table>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Payment Date, Paid Until, Amount</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                                        {payments.paymentsForMember.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableRowColumn>{new Intl.DateTimeFormat().format(new Date(row.paymentDate))
                                                + ' ' + new Intl.DateTimeFormat().format(new Date(row.paidUntil))
                                                + ' ' + row.amount + ' EUR'}</TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                }
                            </Card>
                        </div>
                    </GridTile>
                </GridList>
            </div>

            {isFetching &&
            <CircularProgress className="circular-progress-40"/>
            }


        </form>
    );

};

export default reduxForm({
    form: 'payments',
    validate,
})(PaymentsForm)