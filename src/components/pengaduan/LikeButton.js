import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import {
  likePengaduan,
  unlikePengaduan,
} from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedPengaduan = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.pengaduanId === this.props.pengaduanId
      )
    )
      return true;
    else {
      return false;
    }
  };
  likePengaduan = () => {
    this.props.likePengaduan(this.props.pengaduanId);
  };
  unlikePengaduan = () => {
    this.props.unlikePengaduan(this.props.pengaduanId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedPengaduan() ? (
      <MyButton tip='Undo like' onClick={this.unlikePengaduan}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likePengaduan}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  pengaduanId: PropTypes.string.isRequired,
  likePengaduan: PropTypes.func.isRequired,
  unlikePengaduan: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePengaduan,
  unlikePengaduan,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
