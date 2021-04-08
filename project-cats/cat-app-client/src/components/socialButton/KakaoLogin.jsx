import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'
import styles from '../../styles/KakaoLogin.module.css'
const KakaoLogin = () => {
	const history = useHistory()
	const { Kakao } = window
	// function kakaoLogin() {
	//
	//로그인하고
	// 	Kakao.Auth.login({
	// 		success: function (response) {
	// 			//사용자 정보 가져오기
	// 			Kakao.API.request({
	// 				url: '/v2/user/me', //계정 정보를 가져오는 request url
	// 				success: function (response) {
	// 					let user = response.kakao_account //카카오 계정 정보
	// 					console.log(user)
	// 					user.host = 'kakao' //다른 로그인 서비스와 구분하기 위해서 개인적으로 추가했음
	// 					// 해당 페이지에서 객체를 만들고 곧바로 user 정보를 사용할 수 도 있고,
	// 					// input 엘리먼트에 json으로 저장해뒀다가 나중에 사용할 수도 있음. 여기서는 input에 저장
	// 					const userinfo = document.querySelector('#userinfo')
	// 					if (userinfo) userinfo.value = JSON.stringify(user) //user를 json문자열로 변환해서 저장해두기
	// 				},
	// 				fail: function (error) {
	// 					console.log(error)
	// 				},
	// 			})
	// 		},
	// 		fail: function (error) {
	// 			console.log(error)
	// 		},
	// 	})
	// }
	// function kakaoLogout() {
	// 	if (window.Kakao.Auth.getAccessToken()) {
	// 		//토큰이 있으면
	// 		window.Kakao.API.request({
	// 			//로그아웃하고
	// 			url: '/v1/user/unlink',
	// 			success: function (response) {
	// 				console.log(response)
	// 			},
	// 			fail: function (error) {
	// 				console.log(error)
	// 			},
	// 		})
	// 		//토큰도 삭제
	// 		window.Kakao.Auth.setAccessToken(undefined)
	// 		//유저정보도 삭제
	// 		const userinfoElem = document.querySelector('#userinfo')
	// 		if (userinfoElem) userinfoElem.value = ''
	// 	}
	// }

	const onKakaoLogin = () => {
		Kakao.Auth.login({
			success: function (authObj) {
				//여기에 백엔드 주소 넣어주기
				fetch('http://localhost:3000/user/signup', {
					method: 'POST',
					body: JSON.stringify({
						access_token: authObj.access_token,
					}),
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				})
					.then(res => res.json())
					.then(res => {
						localStorage.setItem('Kakao_token', res.access_token)
						if (res.access_token) {
							alert('로그인 성공')
							history.push('/main')
						}
					})
				console.log(authObj)
			},
			fail: function (err) {
				console.log('백엔드가 없어용')
				alert(JSON.stringify(err))
			},
		})
	}

	return (
		<>
			<button href="#" onClick={onKakaoLogin} className={styles.kakao__btn}>
				<img
					src="./image/kakao-btn.png"
					alt="kakao-logo"
					className={styles.kakao__logo}
				/>
				카카오 로그인
			</button>
			{/* <button onClick={onKakaoLogin}>kakaoLogin</button> */}
			{/* <button onClick={kakaoLogout}>kakaoLogout</button>
			<input id="userinfo" value="" /> */}
		</>
	)
}

export default KakaoLogin
