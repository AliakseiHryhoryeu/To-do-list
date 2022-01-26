import React from 'react';
import classNames from 'classnames';
import { useDispatch, connect } from 'react-redux';

import { setActiveUserIcon } from '@actions/userActions'


function userIcons(props) {

  const dispatch = useDispatch();

  console.log(props.image)
  try {
    return (
      props.images.map((image, index) =>
        <img className={classNames("settings__usericon-img", { "settings__usericon-active": (props.image === image) })}
          key={index} src={image} alt="image"
          onClick={() => dispatch(setActiveUserIcon(image))}
        />)
    )

  } catch {
    return (
      <div className="">Ops... Something went wrong</div>
    )
  }
}

const mapStateToProps = state => ({
  image: state.user.currentUser.userIcon,
  images: state.user.allUserIcons

})

const mapDispatchToProps = { setActiveUserIcon }

export default connect(mapStateToProps, mapDispatchToProps)(userIcons)
