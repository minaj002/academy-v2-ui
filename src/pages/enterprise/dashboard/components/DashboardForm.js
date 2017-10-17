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
    FlatButton, FloatingActionButton,
    GridList,
    GridTile,
    IconButton, IconMenu, MenuItem,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TextField
} from "material-ui";
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blueGrey50} from 'material-ui/styles/colors';


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
    title: {
        width: '90%',
        height: 80,
        padding: 10,
        overflowY: 'auto',
    },
};

const DashboardForm = props => {

    const {isFetching, checkIn, choose, checkedIn, clickToCheckin, setClassTitle} = props;


    return (
        <form>
            <div className="form" style={styles.root}>
                <GridList
                    cols={2}
                    cellHeight={'auto'}
                    padding={3}
                    style={styles.gridList}
                >
                    <GridTile
                        key='topic'
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        actionPosition="left"
                        titlePosition="top"
                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        cols={2}
                        rows={1}
                        style={styles.title}
                    >
                        <div>
                            <TextField
                                hintText="Today's Topic"
                                onChange={setClassTitle}
                                fullWidth={true}
                                value={checkedIn.title}
                            />
                        </div>
                    </GridTile>
                    <GridTile
                        key='unchecked-head'
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                        actionPosition="left"
                        titlePosition="top"
                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        cols={1}
                        rows={1}
                        style={styles.gridTile}
                    >
                        <div className="field">
                            <Card>
                                {checkedIn.quering &&
                                <CircularProgress className="circular-progress-40"/>
                                }
                                {checkedIn.unchecked &&
                                <AutoComplete
                                    floatingLabelText="type name"
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    dataSource={
                                        checkedIn.unchecked.map(item => {
                                            return Object.assign({fullName: item.firstName + " " + item.lastName}, item)
                                        })}
                                    dataSourceConfig={{text: 'fullName', value: 'id'}}
                                    style={styles.gridTileSmall}
                                    onNewRequest={choose}
                                    name="autoComplete"
                                    searchText={checkedIn.searchText}
                                />}


                                {checkedIn.unchecked &&
                                <FloatingActionButton style={{marginRight: 0}} mini={true} onClick={checkIn}
                                                      name="checkIn">
                                    <ContentAdd/>
                                </FloatingActionButton>
                                }
                                {checkedIn.unchecked && <Table>
                                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                                        {checkedIn.unchecked.map((row, index) => (
                                            <TableRow key={index} value={row} onMouseDown={() => {
                                                clickToCheckin(row)
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
                        cols={1}
                        rows={2}
                        style={styles.gridTile}
                    >
                        <div className="field">
                            <Card>
                                {checkedIn.checked &&

                                <Table>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Checked In {checkedIn.checked.length}
                                            </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                                        {checkedIn.checked.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableRowColumn>{row.firstName + ' ' + row.lastName}</TableRowColumn>
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
    form: 'dashboard',
    validate,
})(DashboardForm)