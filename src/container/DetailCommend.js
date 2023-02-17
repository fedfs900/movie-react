import React, { useEffect } from 'react';
import './DetailCommend.scss';
import { Pagination } from 'antd';
import { BiLike, BiCommentDetail, BiCommentEdit } from "react-icons/bi";
import WriteCommend from '../pages/WriteCommend';
import { useDispatch, useSelector } from 'react-redux';
import { getCommends } from '../moduls/moviePost';
import axios from 'axios';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const DetailCommend = ({movno}) => {
    const isLogin = useSelector(state => state.loginCheck.isLogin);
    const onSign = () => {
        dispatch(getCommends(commendData));
    }
    const {loading, data, error} = useSelector(state => state.moviePost.commends);
    const dispatch = useDispatch();


    const commendData = async () => {
        console.log('aaa');
        const data = await axios.get(`${API_URL}/detailcommend/${movno}`);
        return data;
    }   
     console.log(data);

    useEffect(() => {
        dispatch(getCommends(commendData));
    }, [dispatch,movno])
    
    if(loading) return <div>로딩중...</div>
    if(!data) return <div>데이터가 없습니다.</div>
    if(error) return <div>에러가 발생했습니다.</div>

    // 한줄평 수정 상태 관리
    // const [formData, setFormData] = useState({
    //     c_no: '',
    //     c_name: '',
    //     c_desc: '',
    // });
    return (
        <div className='commendbox'>
            <div className='titlezone'>
                <h3>영화 한줄평 <BiCommentDetail className='icon2'/></h3>
                <nav>
                    <span className='infosp'>( 이 영화를 추천 하려면 아이콘을 누르세요 )</span>
                    <BiLike className='icon' /> : <span>0</span>
                </nav>
            </div>
            <div className='commendzone'>
                <table className='commendtable'>
                    <thead>
                        <tr>
                            <th width='30%'>작성자</th>
                            <th width='70%'>한줄평</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0  ?  data.map(da => <tr key={da.c_no}>
                            <td>{da.c_name}</td>
                            <td>{da.c_desc}</td>
                            {(getCookie("usernickname") === `${da.c_name}` && isLogin) ?<>
                            <button className='re'>수정</button>
                            <button className='del'>삭제</button>
                            </>
                            :<><button>야호</button></>
                            }
                        </tr>)
                        : <tr style={{height: '200px'}}>
                            <td colSpan={2}>작성된 한줄평이 없습니다..</td>
                        </tr>}
                    </tbody>
                </table>
                <Pagination defaultCurrent={1} total={50} />
            </div>
            <div className='writezone'>
                <h3>한줄평 쓰기 <BiCommentEdit className='icon2'/></h3>
                <div className='writebox'>
                    {/* textarea있는 컴포넌트 자리 ! */}
                    <WriteCommend movno={movno} onSign={onSign}/>
                </div>
            </div>
        </div>
    );
};

export default DetailCommend;