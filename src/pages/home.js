import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Pengaduan from '../components/Pengaduan';
import Profile from '../components/Profile';

export class home extends Component {
  state = {
    pengaduan: null,
  };
  componentDidMount() {
    axios
      .get('/pengaduan')
      .then((res) => {
        this.setState({
          pengaduan: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentPengaduanMarkup = this.state.pengaduan ? (
      this.state.pengaduan.map((pengaduan) => (
        <Pengaduan key={pengaduan.pengaduanId} pengaduan={pengaduan} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPengaduanMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;
