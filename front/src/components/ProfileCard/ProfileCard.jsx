import React from 'react';
import './ProfileCard.css';
import Cover from '../../img/cover.jpg';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cover from '../../img/cover.jpg';

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverPicture ? serverPublic + user.coverPicture : cover}
          alt="CoverImage"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Escreva sobre você'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Seguidores</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Seguindo</span>
          </div>
          {/* for profilepage */}
          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{' '}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{
              textDecoration: 'none',
              color: '#233445',
            }}
          >
            Meu perfil
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
