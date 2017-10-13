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
    FlatButton,
    FloatingActionButton,
    GridList,
    GridTile,
    IconButton,
    IconMenu,
    MenuItem, RaisedButton,
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
        width: '70%',
        height: 500,
        overflowY: 'auto',
        padding: 10,
        textAlign: 'center'
    },
    autoComplete: {
        width: 150,
        height: 80,
        overflowY: 'auto',
    },
};

const AddPaymentForm = props => {

    const {isFetching, payments, clickToSeePayments, openPaymentDialog} = props;


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
                        key='unchecked-head'
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        actionPosition="left"
                        titlePosition="top"
                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        cols={2}
                        rows={1}
                        style={styles.gridTile}
                    >
                        <div className="field">
                            <Card>
                                {payments.members &&
                                <AutoComplete
                                    floatingLabelText="type name"
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    dataSource={
                                        payments.members.map(item => {
                                            return Object.assign({fullName: item.firstName + " " + item.lastName}, item)
                                        })}
                                    dataSourceConfig={{text: 'fullName', value: 'id'}}
                                    style={styles.autoComplete}
                                    onNewRequest={clickToSeePayments}
                                    name="autoComplete"
                                />}

                                {payments.members && <Table>
                                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                                        {payments.members.map((row, index) => (
                                            <TableRow key={index} value={row} onMouseDown={() => {
                                                clickToSeePayments(row)
                                            }}>
                                                <TableRowColumn>{row.firstName + ' ' + row.lastName}</TableRowColumn>
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
                        rows={2}
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
                                {payments.selected &&
                                <div>
                                    <RaisedButton label="Pay" onClick={openPaymentDialog}/>
                                </div>
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
    form: 'addpayment',
    validate,
})(AddPaymentForm)