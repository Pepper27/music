import React from 'react';
import left_sec1 from '../image/left_sec1.png';
import { ref, onValue } from "firebase/database";
import { db } from "../db";
import { Link } from 'react-router-dom';
import { Buttonlike } from '../components/Buttonlike.js';
import { useEffect, useState } from "react";
import { PlayIndex } from '../components/PlayIndex.js';


export const Bottom = () => {
    const [arraytop, setArraytop] = useState([]);
    useEffect(() => {
        const topSong = ref(db, 'songs');
        onValue(topSong, (items) => {
            const arraytopSong = [];
            items.forEach(item => {
                const data = item.val();//noi dung ben trong
                const key = item.key;// khoa cua noi dung
                if (data.singerId && data.singerId.length > 0) {
                    const Id = data.singerId[0];
                    const singer = ref(db, `singers/${Id}`);
                    onValue(singer, (item) => {
                        const datasinger = item.val();//noi dung ben trong
                        if (data.singerId && data.singerId.length > 0 && arraytopSong.length < 3) {
                            arraytopSong.push(
                                {
                                    id: key,
                                    image: data.image,
                                    title: data.title,
                                    singer: datasinger.title,
                                    listen: data.listen,
                                    audio: data.audio
                                }
                            )
                            setArraytop(...[arraytopSong]);
                        }
                    })
                }
            });
        })
    }, []);
    //end_section_1
    //section_2
    const [arrayy, setArrayy] = useState([]);
    useEffect(() => {
        const arrayType = [];
        const Typesong = ref(db, `categories`);
        onValue(Typesong, (items) => {
            items.forEach(item => {
                const dataType = item.val();//noi dung ben trong
                const key = item.key;// khoa cua noi dung
                if (arrayType.length < 5) {
                    arrayType.push(
                        {
                            id: key,
                            image: dataType.image,
                            title: dataType.title,
                            description: dataType.description
                        }
                    )
                    setArrayy([...arrayType]);
                }
            });
        })
    }, []);
    //end_section_2
    //secton_3
    const [arraySing, setArraysing] = useState([]);
    useEffect(() => {
        const arraySinger = [];
        const dataSinger = ref(db, 'singers');
        onValue(dataSinger, (items) => {
            items.forEach(element => {
                const dataSinger = element.val();
                const key = element.key;
                if (arraySinger.length < 5) {
                    arraySinger.push(
                        {
                            id: key,
                            image: dataSinger.image,
                            title: dataSinger.title,
                            description: dataSinger.description
                        }
                    )
                    setArraysing([...arraySinger]);
                }
            });
        })
    }, []);
    //end section_3
    return (
        <>
            <section className='section_1'>
                <div className="container">
                    <div className="inner-wrap">
                        <div className='left'>
                            <div className='image'>
                                <img src={left_sec1} alt="" />
                            </div>
                        </div>
                        <div className='right'>
                            <h1 >Nghe Nhiều</h1>
                            <div className='listbox'>
                                {
                                    arraytop.map((item, index) => (
                                        <div className='box1'>
                                            <div className='box_left'>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className='box_mid'>
                                                <h2>{item.title}</h2>
                                                <h3>{item.singer}</h3>
                                                <p>{item.listen.toLocaleString()} lượt nghe</p>
                                            </div>
                                            <div className='button'>
                                                <PlayIndex item={item}/>
                                                <Buttonlike />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section_2' >
                <h1 >Danh Mục Nổi Bật</h1>
                <div className="container">
                    <div className='inner-wrap'>
                        {
                            arrayy.map(item => (
                                <Link to={`/list_detail_1/${item.id}`} className='box'>
                                    <img src={item.image} alt="" />
                                    <h3 >{item.title}</h3>
                                    <p >{item.description}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='section_3' >
                <h1 >Ca Sĩ Nổi Bật</h1>
                <div className="container">
                    <Link to="/singer">
                        <div className='inner-wrap'>
                            {
                                arraySing.map(item => (
                                    <div className='box'>
                                        <img src={item.image} alt="" />
                                        <h3 >{item.title}</h3>
                                        <p >{item.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}
export default Bottom;
