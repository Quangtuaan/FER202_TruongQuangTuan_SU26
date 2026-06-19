import React from 'react';
import MyProfile from './MyProfile';

function Footer() {
  //Khai báo 1 object profile chứa các thông tin id, name, email, githubLink, avatarSrc của bạn
  const profile = {
    id: '12345',
    name: 'Quang Tuan',
    email: 'quangtuanhhhtt@gmail.com',
    githubLink: 'https://github.com/Quangtuaan/FER202_TruongQuangTuan_SU26',
    avatarSrc: './images/avatars/avatar.png' 
  };

  return (
    <>
      {/* Viết code CSS cho footer canh cuối trang, nội dung đặt giữa trang   */ }
      <footer style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center'}}>
        <MyProfile profile={profile} />
      </footer>
    </>
  );
}

export default Footer;