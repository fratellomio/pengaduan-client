import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pengaduan from '../components/pengaduan/Pengaduan';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import PengaduanSkeleton from '../util/PengaduanSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    pengaduanIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const pengaduanId = this.props.match.params.pengaduanId;

    if (pengaduanId) this.setState({ pengaduanIdParam: pengaduanId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { semuaPengaduan, loading } = this.props.data;
    const { pengaduanIdParam } = this.state;
    console.log(this.props.data);
    const semuaPengaduanMarkup = loading ? (
      <PengaduanSkeleton />
    ) : semuaPengaduan === null ? (
      <p>Tidak ada pengaduan dari pengguna</p>
    ) : !pengaduanIdParam ? (
      semuaPengaduan.map((pengaduan) => (
        <Pengaduan key={pengaduan.pengaduanId} pengaduan={pengaduan} />
      ))
    ) : (
      semuaPengaduan.map((pengaduan) => {
        if (pengaduan.pengaduanId !== pengaduanIdParam)
          return (
            <Pengaduan key={pengaduan.pengaduanId} pengaduan={pengaduan} />
          );
        else
          return (
            <Pengaduan
              key={pengaduan.pengaduanId}
              pengaduan={pengaduan}
              openDialog
            />
          );
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {semuaPengaduanMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
