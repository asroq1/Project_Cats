import axios from 'axios'

//액션 타입 정의
export const SIGN_UP_REQ = 'SIGN_UP_REQ'

//액션 초기상태 정의
const initialState = {
	email: '',
	name: '',
}
//액션 생성함수 정의
export function signUpReqAction(data) {
	const req = axios.post('user/signup', data).then(rest => rest.data)
	return {
		type: SIGN_UP_REQ,
		payload: req,
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP_REQ:
			return {
				...state,
				signUpReq: action.payload,
			}

		default:
			return state
	}
}

export default reducer
