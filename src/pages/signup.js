import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.forPages,
});

class daftar extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    axios
      .post('/signup', newUserData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data.errors
            ? err.response.data.errors
            : err.response.data,
          loading: false,
        });
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    console.log(errors);
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={icon} alt='icon' className={classes.image} />
          <Typography variant='h2' className={classes.pageTitle}>
            Daftar
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant='outlined'
              id='email'
              name='email'
              type='email'
              label='Email'
              autoComplete='username'
              className={classes.textField}
              helperText={errors.email}
              error={!!errors.email}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              variant='outlined'
              id='password'
              name='password'
              type='password'
              label='Password'
              autoComplete='current-password'
              className={classes.textField}
              helperText={errors.password}
              error={!!errors.password}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              variant='outlined'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              variant='outlined'
              id='handle'
              name='handle'
              type='text'
              label='Handle'
              className={classes.textField}
              helperText={errors.handle}
              error={!!errors.handle}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography
                variant='body2'
                color='error'
                className={classes.customError}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Daftar
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Silahkan <Link to='/signup'> daftar </Link> jika tidak memiliki
              akun
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

daftar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(daftar);
