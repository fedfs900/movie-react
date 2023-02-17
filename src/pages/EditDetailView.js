import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import './WriteText.scss';


const EditDetailView = () => {
    const {no, title, name, desc, date} = useParams();
    console.log(no)
    console.log(title)
    console.log(name)
    console.log(desc)
    console.log(date)

    const navigate = useNavigate();

    const listbt = () => {
        navigate("/free")
    }
    

    const [formData, setFormData] = useState({
        t_title: `${title}`,
        t_nickname: `${name}`,
        t_date: `${date}`,
        t_desc: `${desc}`,
        t_no: `${no}`
    })
    const onChange = (e)=> {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();  
        axios.patch(`${API_URL}/editFree`, formData)
        .then(res=>{
            console.log(res)
            if(res){
                alert('수정완료');
                navigate("/free")
            }
        })
        .catch(e=>console.log(e))
    }
   
    return (
        <div className="Writing">
            <form onSubmit={onSubmit}>
                <h2>게시글 작성</h2>
                <div className='form-wrapper'>
                    <input className="title-input" name="t_title" type='text' 
                    placeholder='제목을 입력하세요' onChange={onChange} value={formData.t_title}/>
                    <input className='title-nick' name='t_nickname' type='text' 
                    placeholder='닉네임 입력' onChange={onChange} value={formData.t_nickname} />
                    <input className='title-date' name='t_date' type='text' placeholder='날짜' 
                    value={formData.t_date} onChange={onChange} /> 
                    <textarea className="text-area" name="t_desc" 
                    placeholder='내용을 입력하세요' onChange={onChange} value={formData.t_desc}></textarea>
                </div>
                <button className="submit-button" type="submit">수정</button>
                <button className="submit-button" type="reset" onClick={listbt}>취소</button>
            </form>
      </div>
    );
};

export default EditDetailView;