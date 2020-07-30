import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Pengaduan from '../components/pengaduan/Pengaduan';
import Profile from '../components/profile/Profile';
import PengaduanSkeleton from '../util/PengaduanSkeleton';

import { connect } from 'react-redux';
import { getSemuaPengaduan } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getSemuaPengaduan();
  }
  render() {
    const { semuaPengaduan, loading } = this.props.data;
    let recentPengaduanMarkup = !loading ? (
      semuaPengaduan.map((pengaduan) => (
        <Pengaduan key={pengaduan.pengaduanId} pengaduan={pengaduan} />
      ))
    ) : (
      <PengaduanSkeleton />
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

home.propTypes = {
  getSemuaPengaduan: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSemuaPengaduan })(home);
