import React, { useCallback, useState, useRef } from 'react';
import useInput from '../hooks/useInput'
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_CAT } from '../reducers/cat';

const CatAdd = () => {
	const dispatch = useDispatch();
	const imageInput =useRef();
	const [name, onChangeName] = useInput('')
	const [birthyear, onChangeBirthYear] = useInput('')
	const [birthmonth, onChangeBirthMonth] = useInput('')
	const [birthdate, onChangeBirthDate] = useInput('')

	
	const onSubmit = useCallback(e => {
		
		e.preventDefault()
		
		dispatch({
			type: ADD_CAT,
			data: {name, birthyear, birthmonth, birthdate },
		})
	}, [name, birthyear, birthmonth, birthdate]);

	const handleOptionChange = changeEvent => {
		// this.setState({
		//   selectedOption: changeEvent.target.value
		// });
	};

	const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

	return (
		<>

			<h2>당신의 주인님에 대해 알려주세요!</h2>
			<form onSubmit={onSubmit}>
				<div>
					<input type ="file" multiple hidden ref={imageInput} />
					{/*  DOM에 접근할 때 ref사용 */}
					<button onClick = {onClickImageUpload}>사진추가</button>
				</div>
				<div>
					<label htmlFor="cat-name">이름</label>
					<br />
					<input
						type="text"
						name="cat-name"
						value={name}
						onChange={onChangeName}
						maxLength="50"
						required
					/>
				</div>
				<div>
					<label htmlFor="cat-birthday">생일</label>
					<br />
					<input
						type="number"
						name="cat-birthyear"
						value={birthyear}
						onChange={onChangeBirthYear}
						required
					/>
					<input
						type="number"
						name="cat-birthmonth"
						value={birthmonth}
						onChange={onChangeBirthMonth}
						required
					/>
					<input
						type="number"
						name="cat-birthdate"
						value={birthdate}
						onChange={onChangeBirthDate}
						required
					/>
				</div>
				<div className="gender-check">
					<label htmlFor="cat-gender">성별</label>
					<label>
						<input
							type="radio"
							name="cat-gender"
							value="남"
							// checked={selectedOption === "남"}
							onChange={handleOptionChange}
						/>
					남
					</label>

					<label>
						<input
							type="radio"
							name="cat-gender"
							value="여"
							// checked={selectedOption === "여"}
							onChange={handleOptionChange}
						/>
					여
					</label>
				</div>
				<br />

				{/* <div>
				<label htmlFor="user-password-check">Password Check</label>
				<br />
				<Input
					name="user-password-check"
					type="password"
					value={passwordCheck}
					required
					onChange={onChangePasswordCheck}
				/>
				{passwordError && <ErrorMessage>Passwords do not match!</ErrorMessage>}
			</div>
			<div>
				<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>I agree to all the conditions required.</Checkbox>
				{termError && <ErrorMessage>You must agree to Terms and Conditions.</ErrorMessage>} */}
				{/* </div> */}
				<div style={{ marginTop: 10 }}>
					<button>취소</button>
					<button htmlType="submit">등록</button>
				</div>
			</form>
		</>
	);
}

export default CatAdd
