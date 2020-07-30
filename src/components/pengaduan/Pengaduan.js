import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePengaduan from './DeletePengaduan';
import PengaduanDialog from './PengaduanDialog';
import LikeButton from './LikeButton';
//Material UI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// icons
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import {
  likePengaduan,
  unlikePengaduan,
} from '../../redux/actions/dataActions';

const style = {
  card: {
    position: 'relative',
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
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePengaduan pengaduanId={pengaduanId} />
      ) : null;
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
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton pengaduanId={pengaduanId} />
          <span>{likeCount} dukungan</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} komentar</span>
          <PengaduanDialog
            pengaduanId={pengaduanId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
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
  openDialog: PropTypes.bool,
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
