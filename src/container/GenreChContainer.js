import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import { getDatas } from '../moduls/moviePost';
import movieSelect, { setreset, setSelect } from '../moduls/selectMovie';
//import GenrePage from '../pages/GenrePage';
import GenrePageSelect from '../pages/GenrePageSelect';

const mm = {
    margin: "300px",
    marginLeft: "800px",
    color: "#fff"
}

const GenreChContainer = () => {
    const genrelist = useSelector(list=>list.movieSelect)
    const navigate = useNavigate()
    const onToggle = id => dispatch(setSelect(id))
    const {genrechange} = useParams();
    //console.log(genrechange)
    const {loading, data, error} = useSelector(state => state.moviePost.moviePosts);
    const dispatch = useDispatch();
    
    const selectData = async () => {
        //console.log(genrechange)
        const data = await axios.get(`${API_URL}/genrech/${genrechange}`);
        //console.log(data)
        return data;
    }
    useEffect(() => {
       dispatch(getDatas(selectData));
      console.log("여기는 genreCh")
       //console.log(data)
       console.log(genrelist)
    }, [dispatch, genrechange]);
    //console.log(data)
    if(loading) return <div style={{...mm}}>로딩중입니다..</div>
    if(error) return <div style={{...mm}}>에러가 발생했습니다.</div>
    if(!data) return <div style={{...mm}}>데이터가 없습니다.</div>
    return (
            <GenrePageSelect data={data} genrelist={genrelist} onToggle={onToggle}/>
    );
};

export default GenreChContainer;