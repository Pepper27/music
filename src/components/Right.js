import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Right = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?keyword=${search}`);
  }; 
  return (
    <div className='Right'>
      <form onSubmit={handleSearch} action="#" class="inner-form">
        <button type="submit" ><IoSearchSharp /></button>
        <input autoComplete='on' value={search} onChange={handleInputChange} type="" placeholder="Tìm kiếm..." />
      </form>
    </div>

  )
};
export default Right;



