/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFirebase } from "./firebase";

import { signInWithEmailAndPassword } from 'firebase/auth/web-extension';

const Login = () => {
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng

  const login = (event) => {
    event.preventDefault(); // Ngăn form submit mặc định

    navigate('/'); // Điều hướng về trang chủ

    const email = event.email.value;
    const password = event.password.value;

    if(email && password) {
      signInWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user) {
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
   };
   

  return (
    <div className='Login'>
      <div className="container">
        <h2>Đăng Nhập Tài Khoản</h2>
        <form className="form" onSubmit={login}> {/* Thêm onSubmit vào form */}
          <div className="input-group">
            <label>Email <span className="email">*</span></label>
            <input type="email" placeholder="Ví dụ: levana@gmail.com" required/>
          </div>.
          <div className="input-group">
            <label>Mật Khẩu <span className="email">*</span></label>
            <input type="password" required />
          </div>
          <button type="submit" className="button">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
