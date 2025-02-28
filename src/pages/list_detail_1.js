import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { onValue, ref } from 'firebase/database';
import { db } from '../db';
import { Buttonlike } from '../components/Buttonlike';
// import { Buttonplay } from '../components/Buttonplay';
import { FaPlay} from "react-icons/fa";
const ListDetail1 = () => {
  const { id } = useParams();
  console.log("1232");
  console.log(id);
  const arrayList = [];
  const dataList = ref(db, `songs`);
  onValue(dataList, (items) => {
    items.forEach(item => {
      const data = item.val();
      const key = item.key;
      if (arrayList.length < 8) {
        const singer = ref(db, `singers/${id}`);
        onValue(singer, (item) => {
          const datasinger = item.val();
          if (data.categoryId === id) {
            arrayList.push(
              {
                id: key,
                image: data.image,
                title: data.title,
                description: data.description,
                titlesinger: datasinger.title,
                statuslike: data.like
              }
            )
          }
        })
      }
    });
  })
  const [array, setArray] = useState([]);
  useEffect(() => {
    const arrayType = [];
    const dataType = ref(db, `categories/${id}`); //`/${id}` thi ko can foreach
    onValue(dataType, (item) => {
      const dataType = item.val();
      const key = item.key;
      arrayType.push(
        {
          id: key,
          image: dataType.image,
          title: dataType.title,
          description: dataType.description
        }
      )
      setArray([...arrayType]);

    })
  }, [id]);
  console.log(arrayList);

  return (
    <div className='ListDetail1'>
      <div className='container'>
        <div className='section_1'>
          {
            array.map(item => (
              <div className='inner-wrap'>
                <div className='image'>
                  <img src={item.image} alt="" />
                </div>
                <div className='content'>
                  <h1 >{item.title}</h1>
                  <p >{item.description}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className='section_2'>
          <div className='title_a'>
            <p >Danh Sách Bài Hát</p>
          </div>
          <div className='list'>
            {
              arrayList.map(item => (
                <div className='box' >
                  <div className='left'>
                    <FaPlay />
                    <Link to={`/detail_song/${item.id}`}>
                      <img src={item.image} alt="" />
                    </Link>
                    <h2>{item.title}</h2>
                  </div>
                  <div className='mid'>
                    <p >{item.titlesinger}</p>
                  </div>
                  <div className='right'>
                    <p >4:32</p>
                    <Buttonlike id={item.id} statuslike={item.statuslike} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ListDetail1;