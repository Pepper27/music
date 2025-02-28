import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { ref, onValue } from "firebase/database";
import { db } from "../db";

export const ListType = () => {
    const [array, setArray] = useState([]);
    useEffect(() => {
        const arrayType = [];
        const dataType = ref(db, `categories`);
        onValue(dataType, (items) => {
            items.forEach(item => {
                const dataType = item.val();
                const key = item.key;
                if (arrayType.length < 10) {
                    arrayType.push(
                        {
                            id: key,
                            image: dataType.image,
                            title: dataType.title,
                            description: dataType.description
                        } 
                    )
                    setArray([...arrayType]);
                }
            });
        })
    },[]);
    console.log(array);

    return (
        <div className='ListType'>
            <h1>Danh Mục Nổi Bật</h1>
            <div className="container">
                <div className='inner-wrap'>
                    {
                        array.map(item => (
                            <Link to={`/list_detail_1/${item.id}`} className='box'>
                                <img src={item.image} alt="" />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ListType;

