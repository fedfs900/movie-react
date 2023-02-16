import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/apiurl';

const DetailReview = ({movno}) => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        axios.get(`${API_URL}/detailreview/${movno}`)
        .then(res=>{
            console.log(res.data)
            setReviews(res.data);
        })
        .catch(e=>console.log(e))
    },[])
    const lists = [<div>하하</div>,<div>하하</div>,<div>하하</div>]
    if(!reviews) return <div>데이터가 없습니다.</div>
    return (
        <>
        {reviews.map(re=>{
            return (
                <div className='reviewlist detail' style={{backgroundColor:"#fff", width:"75%"}}>
        <div className='reviewbox'>
                <div className='imgbox'>
                    <img src={`${API_URL}/${re.r_img}`} alt=''/>
                </div>
                <div className='reviewtext' style={{width:"85%", marginLeft:"3%"}}>
                    <div className='rev_title'>
                        <nav className='titlesp'>
                            <span>{re.r_title}</span>
                        </nav>
                        <nav className='rev_writen'>
                            <span>작성자</span>
                            <span>:</span>
                            <span>{re.r_nickname}</span>
                        </nav>
                    </div>
                    <div className='rev_desc'>
                        <p>{re.r_desc}</p>
                    </div>
                </div>
            </div>
        </div>
            )
        })}
        </>
    );
};

export default DetailReview;