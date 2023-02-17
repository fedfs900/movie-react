import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/apiurl';
import { goToHome, setLogin } from '../../moduls/loginCheck';
import { setCookie } from '../../util/cookie';
import './Login.scss';

const LoginPage = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        userid: "",
        userpassword: "",
    })
    const onChange = (e) => {
        const {name , value} = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(loginData.id === '' || loginData.password === '') {
            alert('이메일과 비밀번호를 입력해주세요.')
        } else {
            axios.post(`${API_URL}/login`, loginData)
            .then(result=>{
                console.log(result)
                const {id, nicname} = result.data[0];
                if(result.data === "실패") {
                    alert("로그인 실패하였습니다.")
                }
                if(id && nicname) {
                    alert("로그인하였습니다.")
                    let expires = new Date();
                    expires.setMinutes(expires.getMinutes()+60);
                    setCookie('userid', `${id}`, {path: '/', expires});
                    setCookie('usernickname', `${nicname}`, 
                    {path: '/', expires});
                    dispatch(setLogin());
                    dispatch(goToHome(navigate))
                }
            })
            .catch(e=>{
                console.log(e)
            })
        }
    }

    return (
        <div className='inner'>
            <div className='login'>
                <div className='loginbox'>
                    <h2>로그인</h2>
                    <form onSubmit={onSubmit}>
                    <table className='login_table'>
                        <tbody>
                            <tr>
                                <td>
                                    <span>아이디</span>
                                </td>
                                <td>
                                    <input name='userid' type='text' value={loginData.userid} onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>비밀번호</span>
                                </td>
                                <td>
                                    <input name='userpassword' type='password' value={loginData.userpassword} onChange={onChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ul className='find'>
                        <Link to="/findid"><li>아이디 찾기</li></Link>
                        <span>|</span>
                        <Link to="/findpass"><li>비밀번호 찾기</li></Link>
                    </ul>
                    <div className='login_btn'>
                        <button type="submit">로그인</button>
                        <Link to="/join"><button>회원가입</button></Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;