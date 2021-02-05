/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Button, withStyles } from '@material-ui/core';
import { Mutation } from '@apollo/react-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { GET_TRAINEE} from './query';
import { UPDATE_TRAINEE, CREATE_TRAINEE } from './Mutation';
import { snackbarContext } from '../../contexts';
import { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB } from './Subscription';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
      loading: false,
      Count: 0,
      dataObj: [],
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  onSubmitAdd = async (data, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      refetch();
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }}

  handleSelect = (event) => {
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = (value) => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    // console.log('value trainee', value);
    // eslint-disable-next-line no-console
    // console.log('Deleted Item ', deleteData);
    const { createdAt } = deleteData;
    const isAfter = moment(createdAt).isSameOrAfter('2019-02-14T18:15:11.778Z');
    const message = isAfter
      ? 'This is a success message!'
      : 'This is an error message!';
    const status = isAfter ? 'success' : 'error';
    value(message, status);
  };

  // eslint-disable-next-line no-unused-vars
  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  onSubmitEdit = async (data, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      refetch();
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }}

  handlesnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      // snackbarOpen: false,
    });
  };

  handlePageChange = (refetch) => (event,newPage) => {
    const { data: { variables } } = this.props;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ variables })
    }
    )
  }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        console.log('prevvvvv', prev);
        // const { getAllTrainees: { ...record } } = prev;
        const { getAllTrainees: {record}} = prev;
        console.log('record-------', record);
        // for (const i in record){
        //   console.log('jjjjj', record[i].originalId);
        // }
        // console.log(...record);
        // const a = record[0];
        // console.log('11111111111111111111111111', a);
        const { data: { traineeUpdated } } = subscriptionData;
        // console.log('22222', typeof(traineeUpdated.data1[0].originalId));
        // console.log('traineeeeeeeeeeeeUpdated', traineeUpdated.traineeUpdated.data1[0].originalId);
        console.log('subscription data**********', subscriptionData);
        const updatedRecords = [record].map((records) => {

          for (const i in records){
            if (records[i].originalId === traineeUpdated.data1[0].originalId) {
              console.log('found match ');
              return {
                records,
                ...traineeUpdated.data1[0],
              };
            }
          }
          return records;
        //  console.log('lasssssssssssssssst', records);
        });
        console.log('4444444', traineeUpdated.data1[0]);
        console.log('333333333', updatedRecords);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.traineeCount,
            record: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        console.log(' sub delete : ', traineeDeleted.data.originalId);
        // eslint-disable-next-line max-len
        const updatedRecords = [...record].filter((records) => records.originalId !== traineeDeleted.data.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount - 1,
            record: updatedRecords,
          },
        };
      },
    });
  }




  render() {
    const {
      open, order, orderBy, page,
      rowsPerPage, EditOpen, RemoveOpen, editData,
      deleteData, loading,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { record = [], traineeCount = 0 } = {},
        refetch,
      // loading,
      },
      } = this.props;
      const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
      return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(createTrainee, createrLoader = { loading }) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(updateTrainee, updateLoader = { loading }) => (
                <snackbarContext.Consumer>
                  {( value ) => (
                    <>
                      <div className={classes.root}>
                        <div className={classes.dialog}>
                          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            ADD TRAINEELIST
                          </Button>
                          <AddDialog
                            open={open}
                            onClose={this.handleClose}
                            onSubmit={
                              (data) => this.onSubmitAdd(
                                data, value, createTrainee, refetch,
                              )
                            }
                            loading={createrLoader}
                          />
                        </div>
          &nbsp;
          &nbsp;
                        <EditDialog
                          Editopen={EditOpen}
                          handleEditClose={this.handleEditClose}
                          handleEdit={
                            (data) => this.onSubmitEdit(data, value, updateTrainee, refetch,)
                          }
                          data={editData}
                        />
                        <br />
                        <DeleteDialog
                          openRemove={RemoveOpen}
                          onClose={this.handleRemoveClose}
                          remove={this.handleRemove}
                          rmdata={deleteData}
                          onSubmit={this.handleRemove}
                          refetch={refetch}
                        />
                        <br />
                        <br />
                        <TableComponent
                          // loader={loading}
                          id="id"
                          data={record}
                          column={
                            [
                              {
                                field: 'name',
                                label: 'Name',
                              },
                              {
                                field: 'email',
                                label: 'Email Address',
                                format: (value) => value && value.toUpperCase(),
                              },
                              {
                                field: 'createdAt',
                                label: 'Date',
                                align: 'right',
                                format: this.getDateFormat,
                              },
                            ]
                          }
                          actions={[
                            {
                              icon: <EditIcon />,
                              handler: this.handleEditDialogOpen,

                            },
                            {
                              icon: <DeleteIcon />,
                              handler: this.handleRemoveDialogOpen,
                            },
                          ]}
                          onSort={this.handleSort}
                          orderBy={orderBy}
                          order={order}
                          onSelect={this.handleSelect}
                          count={traineeCount}
                          page={page}
                          onChangePage={this.handlePageChange(refetch)}
                          rowsPerPage={rowsPerPage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    </>
                  )}
                </snackbarContext.Consumer>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 50, sort: 'name' } },
  }),
)(TraineeList);
