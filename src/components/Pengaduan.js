import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
//Material UI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likePengaduan, unlikePengaduan } from '../redux/actions/dataActions';

const style = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};
class Pengaduan extends Component {
  likedPengaduan = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.pengaduanId === this.props.pengaduan.pengaduanId
      )
    )
      return true;
    else {
      return false;
    }
  };
  likePengaduan = () => {
    this.props.likePengaduan(this.props.pengaduan.pengaduanId);
  };
  unlikePengaduan = () => {
    this.props.unlikePengaduan(this.props.pengaduan.pengaduanId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      pengaduan: {
        body,
        createdAt,
        userImage,
        userHandle,
        pengaduanId,
        likeCount,
        commentCount,
      },
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip='like'>
        <Link to='/login'>
          <FavoriteBorder color='primary' />
        </Link>
      </MyButton>
    ) : this.likedPengaduan() ? (
      <MyButton tip='undo like' onClick={this.unlikePengaduan}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='like' onClick={this.likePengaduan}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color={'primary'}
          >
            {userHandle}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comment</span>
        </CardContent>
      </Card>
    );
  }
}

Pengaduan.propTypes = {
  likePengaduan: PropTypes.func.isRequired,
  unlikePengaduan: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  pengaduan: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  likePengaduan,
  unlikePengaduan,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(Pengaduan));
