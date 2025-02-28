// import React, { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../db';
export const Singer = () => {
    const arraySinger = [];
    const singerRef = ref(db, 'singers');
    onValue(singerRef, (items) => {
        items.forEach(item => {
            const data = item.val();
            const key = item.key;
            arraySinger.push(
                {
                    id: key,
                    image: data.image,
                    title: data.title,
                    description: data.description
                }
            )
        });
    })
    return (
        <div className="Singer" >
            <p >Danh Sách Ca Sĩ</p>
            <div className='list'>
                {
                    arraySinger.map(item => (
                        <div className="box">
                            <img src={item.image} alt=""/>
                            <h2 >{item.title}</h2>
                            <p >{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Singer;