import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export class home extends Component {
  state = {
    pengaduan: null,
  };
  componentDidMount() {
    axios
      .get('/pengaduan')
      .then((res) => {
        console.log(res.data);
        this.setState({
          pengaduan: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentPengaduanMarkup = this.state.pengaduan ? (
      this.state.pengaduan.map((pengaduan) => <p>{pengaduan.body}</p>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentPengaduanMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>content...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
