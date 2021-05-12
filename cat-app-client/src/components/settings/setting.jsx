import React, {useState, useCallback, useEffect} from 'react';

import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import styled from 'styled-components';

import ModalMenu from '../modal/ModalMenu';


const GeneralWrapper = styled.div`
    height: 100vh;
    background-color: ${({theme})=>theme.beige};
    color: ${({theme})=>theme.text};

    .Menu{

        text-align:right;
    }
`;


const InnerLayout = styled.div`
    padding: 2rem;

        
    h1 {
        font-size: 1.5rem;
        font-weight: 900;
    }

    h2 {
        margin-top: 1rem;
        font-size: 1rem;
    }

    `;

const Settings = () => {

    const {me} = useSelector((state)=>state.user)
    const history = useHistory();
    const [showModalMenu, setShowModalMenu] = useState(false);
    const onModalMenu = useCallback(() => {
        setShowModalMenu(true);
    }, []);
    const onModalClose = useCallback(() => {
        setShowModalMenu(false);
    }, []);

    useEffect(() => {
        if (!localStorage.token){
            
            alert('로그인 먼저 해주세요')
            history.push("/");
        }
    }, [me])

    return (
        <GeneralWrapper>
            {showModalMenu && (
                <ModalMenu
                    onClose={onModalClose}
                />
            )}

            
            <InnerLayout className="Menu">
                    <i onClick={onModalMenu} className="fa fa-bars"></i>
            </InnerLayout>

            <InnerLayout>
                <h1>
                    Contact
                </h1>
                <h2>https://github.com/asroq1/Project_Cats</h2>
            </InnerLayout>
            {/* <div>
                <button>다크모드</button>
            </div>
            <div>
                <button type="button" onClick = {onLogOut}>로그아웃</button>
                <button>문의사항</button>
            </div> */}
        </GeneralWrapper>
    );
};

export default Settings;
