import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const WriteCommend = ({movno,onSign}) => {
    const navigate = useNavigate();
    // textarea 글자 수 상태 관리
    const [textCount, setTextCount] = useState(0);
    // 한줄평 상태관리
    const isLogin = useSelector(state => state.loginCheck.isLogin);
    const [formData, setFormData] = useState({
        c_name: getCookie('usernickname'),
        c_desc: '',
        c_movno: movno
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setTextCount(e.target.value.length);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!isLogin) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
        if(isLogin) {
            
            setFormData({
                ...formData,
                c_desc: ''
            })
            setTextCount(0);
            WriteCommend();
        }
    }
    const WriteCommend = () => {
        axios.post(`${API_URL}/commend`, formData)
        .then(res => {
            console.log(res.data);
            ss()
            onSign();
            alert('등록되었습니다.');
           
        })
        .catch(e => console.log(e))
        
    }
     let count = 0
     console.log(`함수 밖${count}`)
     const ss = () => {
         count += 1
         console.log(`함수 안${count}`)
     }
    return (
        <div className='write'>
             <form onSubmit={onSubmit} >
                <textarea maxLength={50} onChange={onChange}  name="c_desc"
                placeholder='이 영화의 한줄평을 자유롭게 적어주세요.' value={formData.c_desc}/>
                <button type='submit' >등록하기</button>
            </form> 
            <p>
                <nav>
                    <span className='countsp'>{textCount}</span>
                    <span>/</span>
                    <span>50 자</span>
                </nav>
            </p>
        </div>
    );
};

export default WriteCommend;