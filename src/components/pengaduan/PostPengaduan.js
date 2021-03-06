import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postPengaduan, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.forPages,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

class PostPengaduan extends Component {
  state = {
    open: false,
    judul: '',
    body: '',
    lokasi: '',
    tanggal: '',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        judul: '',
        lokasi: '',
        tanggal: '',
        open: false,
        errors: {},
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.postPengaduan({
      judul: this.state.judul,
      body: this.state.body,
      lokasi: this.state.lokasi,
      tanggal: this.state.tanggal,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        Tulis Pengaduan
        <MyButton onClick={this.handleOpen} tip='Tulis Pengaduan'>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Tulis Pengaduan</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='judul'
                type='text'
                label='Judul'
                placeholder='Judul pengaduan'
                error={errors.body ? true : false}
                helperText={errors.judul}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='body'
                type='text'
                label='Pengaduan'
                multiline
                rows='5'
                placeholder='isi pengaduan'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='lokasi'
                type='text'
                label='Lokasi'
                placeholder='Lokasi kejadian'
                error={errors.body ? true : false}
                helperText={errors.lokasi}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='tanggal'
                type='date'
                error={errors.body ? true : false}
                helperText={errors.tanggal}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostPengaduan.propTypes = {
  postPengaduan: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postPengaduan, clearErrors })(
  withStyles(styles)(PostPengaduan)
);
