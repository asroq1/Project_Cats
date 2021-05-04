import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom';

import { LOG_OUT_REQUEST } from '../../reducers/user';

const Settings = () => {

    const dispatch = useDispatch();

    const { me } = useSelector((state) => state.user);
            
    const onLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
    })

    const history = useHistory();
    useEffect(() => {
        if (!localStorage.token){
            history.push("/");
        }
    }, [me])

    return (
        <>
            <div>
                <button>다크모드</button>
            </div>
            <div>
                <button type="button" onClick = {onLogOut}>로그아웃</button>
                <button>문의사항</button>
            </div>
        </>
    );
};

export default Settings;
