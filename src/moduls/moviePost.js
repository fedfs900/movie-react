//액션타입
const GET_DATAS = "moviePost/GET_DATAS";
const GET_DATAS_SUCCESS = "moviePost/GET_DATAS_SUCCESS";
const GET_DATAS_ERROR = "moviePost/GET_DATAS_ERROR";

const GET_DATA = "moviePost/GET_DATA";
const GET_DATA_SUCCESS = "moviePost/GET_DATA_SUCCESS";
const GET_DATA_ERROR = "moviePost/GET_DATA_ERROR";

const GET_REVIEWS = "GET_REVIEWS";
const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
const GET_REVIEWS_ERROR = "GET_REVIEWS_ERROR";

const GET_NOTICES = "GET_NOTICES";
const GET_NOTICES_SUCCESS = "GET_NOTICES_SUCCESS";
const GET_NOTICES_ERROR = "GET_NOTICES_ERROR";

const GET_COMMENDS = "GET_COMMENDS";
const GET_COMMENDS_SUCCESS = "GET_COMMENDS_SUCCESS";
const GET_COMMENDS_ERROR = "GET_COMMENDS_ERROR";

//초기값
const initialState = {
    moviePosts: {
        loading: false,
        data: null,
        error: null
    },
    moviePost: {
        loading: false,
        data: null,
        error: null
    },
    reviewPosts: {
        loading: false,
        data: null,
        error: null
    },
    noticePosts: {
        loading: false,
        data: null,
        error: null
    },
    commends: {
        loading: false,
        data: null,
        error: null
    },
}

//리듀서만들기
export const getDatas = callback => async dispatch => {
    dispatch({type: GET_DATAS})
    try{
        const response = await callback();
        console.log(response)
        const data = response.data
        dispatch({
            type: GET_DATAS_SUCCESS, data : data
        })
    }
    catch(e){
        dispatch({type: GET_DATAS_ERROR, error: e})        
    }
}

export const getData = callback => async dispatch => {
    dispatch({type: GET_DATA})
    try{
        const response = await callback();
        const data = response.data[0];
        dispatch({
            type: GET_DATA_SUCCESS, data : data
        })
    }
    catch(e){
        dispatch({type: GET_DATA_ERROR, error: e})        
    }
}

export const getReviews = callback => async dispatch => {
    dispatch({type: GET_REVIEWS})
    try {
        const response = await callback();
        const data = response.data;
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            data: data
        })
    }
    catch(e) {
        dispatch({type: GET_REVIEWS_ERROR})
    }
}

export const getNotices = callback => async dispatch => {
    dispatch({type: GET_NOTICES})
    try {
        const response = await callback();
        const data = response.data;
        dispatch({
            type: GET_NOTICES_SUCCESS,
            data: data
        })
    }
    catch(e) {
        dispatch({type: GET_NOTICES_ERROR})
    }
}

export const getCommends = callback => async dispatch => {
    dispatch({type: GET_COMMENDS})
    try {
        const response = await callback();
        const data = response.data;
        dispatch({
            type: GET_COMMENDS_SUCCESS,
            data: data
        })
    }
    catch(e) {
        dispatch({type: GET_COMMENDS_ERROR,
        error:e})
    }
}

//리듀서 만들기
export default function moviePost(state=initialState, action) {
    switch(action.type){
        case GET_DATAS:
            return {
                ...state,
                moviePosts: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_DATAS_SUCCESS:
            return {
                ...state,
                moviePosts: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_DATAS_ERROR:
            return {
                ...state,
                moviePosts: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };

        // 하나씩 받아올 때 
        case GET_DATA:
            return {
                ...state,
                moviePost: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        
        case GET_DATA_SUCCESS:
            return {
                ...state,
                moviePost: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_DATA_ERROR:
            return {
                ...state,
                moviePost: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        
        // 리뷰 받아올 때
        case GET_REVIEWS:
            return {
                ...state,
                reviewPosts: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                reviewPosts: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_REVIEWS_ERROR:
            return {
                ...state,
                reviewPosts: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };

        // 공지사항 받아올 때
        case GET_NOTICES:
            return {
                ...state,
                noticePosts: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_NOTICES_SUCCESS:
            return {
                ...state,
                noticePosts: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_NOTICES_ERROR:
            return {
                ...state,
                noticePosts: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        
        // 상세 한줄평 받아올 때
        case GET_COMMENDS:
            return {
                ...state,
                commends: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_COMMENDS_SUCCESS:
            return {
                ...state,
                commends: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_COMMENDS_ERROR:
            return {
                ...state,
                commends: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        default:
            return state;    
    }
}