import React from 'react'
import avatar from '../../assets/images/men-avatar.png';
import { Button } from '@mui/material';

function ProfileHeader({user}) {
  
  return (
    <header className="profileHeaderUser">
        <img src={avatar} alt="Profile" className="profileAvatar" />
        <Button className="editProfile" >Edit</Button>
        <h2>Hello, {user?.name}!</h2>
      </header>
  )
}

export default ProfileHeader