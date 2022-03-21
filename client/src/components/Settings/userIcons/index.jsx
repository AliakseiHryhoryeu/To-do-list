import React from 'react';
import classNames from 'classnames';
import { useDispatch, connect } from 'react-redux';

import { setActiveUserIcon } from '@actions/userActions'

import img1 from '@img/userIcon_1.png'
import img2 from '@img/userIcon_2.png'
import img3 from '@img/userIcon_3.png'
import img4 from '@img/userIcon_4.png'
import img5 from '@img/userIcon_5.png'
const allUserIcons = [img1, img2, img3, img4, img5]


function userIcons(props) {

  const dispatch = useDispatch();

  console.log(props.image)
  try {
    return (
      allUserIcons.map((image, index) =>
        <img className={classNames("settings__usericon-img", { "settings__usericon-active": (props.image === image) })}
          key={index} src={image} alt="image"
          onClick={() => dispatch()}
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
