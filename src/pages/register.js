import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng

  const register = (event) => {
    event.preventDefault(); // Ngăn form submit mặc định
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className='Login'>
      <div className="container">
        <h2>Đăng Nhập Tài Khoản</h2>
        <form className="form" onSubmit={register}> {/* Thêm onSubmit vào form */}
        <div className="input-group">
            <label>Họ tên <span className="name">*</span></label>
            <input type="text" placeholder="Ví dụ: Nguyễn Văn A" required />
          </div>
          <div className="input-group">
            <label>Email <span className="email">*</span></label>
            <input type="email" placeholder="Ví dụ: levana@gmail.com" required />
          </div>
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
