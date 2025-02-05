import React, { useState } from 'react';
import "./Navi.scss";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navi = () => {
    // 메뉴 상태관리
    const [isOpen, setOpen] = useState(true);
    const toggleMenu = () => {
        setOpen(isOpen => !isOpen);
        console.log(isOpen);
    }
    return (
        <nav>
            <button onClick={toggleMenu} className={isOpen ? 'close_btn navBtn' : 'open_btn navBtn'}>
                {isOpen ? <RiMenuUnfoldFill className='navicon'/> : <RiMenuFoldFill className='navicon'/>}
            </button>
            <div className={isOpen ? 'show_menu move' : 'hide_menu move'}>
                <ul className='navmenu'>
                    <li><span><Link to='/'>HOME</Link></span></li>
                    <li>
                        <span><Link to='/latest'>최신영화</Link></span>
                        <div className='innermenu'>
                            <ul>
                                <li><Link to='/latest'>현재 상영작</Link></li>
                                <li><Link to='/yet'>개봉 예정작</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <span><Link to='/recomend'>추천영화</Link></span>
                        <div className='innermenu'>
                            <ul>
                                <li><Link to='/month'>이달의 추천 영화</Link></li>
                                <li><Link to='/genrepage/전체'>장르별 추천 영화</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <span><Link to='/test'>영화리뷰</Link></span>
                    </li>
                    <li>
                        <span>커뮤니티</span>
                        <div className='innermenu'>
                            <ul>
                                <li><Link to='/notice'>공지사항</Link></li>
                                <li><Link to='/free'>자유 게시판</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navi;