export const initialState = {
	user: {
		isLoggedIn: true,
		user: 1,
	},
	current_index: 0,
	cat: [
		{
			cat_id: 0,
			user_id: 1,
			name: 'Garfield',
			gender: 'M',
			photo:
				'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
			age: 3,
			Record: {
				cdt: '2021-03-30',
				wgt: 3.1,
			},
		},
		{
			cat_id: 1,
			user_id: 1,
			name: 'meme',
			gender: 'F',
			photo:
				'https://i.pinimg.com/originals/d5/d2/3e/d5d23ed7f286b97fe8319bea6ee0c9d0.jpg',
			age: 5,
			Record: {
				cdt: '2018-03-18',
				wgt: 5.7,
			},
		},

		{
			cat_id: 2,
			user_id: 1,
			name: '냥냥이',
			gender: 'M',
			photo:
				'https://lh3.googleusercontent.com/proxy/EfgrOQ0d_7Ovlx-OxNhBHruHhcKg5RRjhUuL_oTnYhR0ixLyR0Aa7LSAaj18freBge9fWG_h2d7fCbR_YIS30pZEMjDfspJyfQYbtbwsBcdhgSCUJ9mFcClsSpNw3mBM-CeBvxUt71Sa24xdF4-WTYMTN0npFLL1cl1tMX0U_nK7F6nwlTgG9waO',
			age: 6,
			Record: {
				cdt: '2019-02-28',
				wgt: 10.2,
			},
		},
	],
}

const cat = (data) => ({
    cat_id: 3,
    user_id: 1,
    name: data.name,
    gender: 'M',
    photo: 'https://lh3.googleusercontent.com/proxy/EfgrOQ0d_7Ovlx-OxNhBHruHhcKg5RRjhUuL_oTnYhR0ixLyR0Aa7LSAaj18freBge9fWG_h2d7fCbR_YIS30pZEMjDfspJyfQYbtbwsBcdhgSCUJ9mFcClsSpNw3mBM-CeBvxUt71Sa24xdF4-WTYMTN0npFLL1cl1tMX0U_nK7F6nwlTgG9waO',
    age: data.birthyear,
    Record: {}
})

export const CHANGE_CAT = 'CHANGE_CAT';

export const ADD_CAT = 'ADD_CAT';

export const changeCat = (data) => ({
    type: CHANGE_CAT,
    data
})

export const addCat = (data) => ({
    type: ADD_CAT,
    data
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CAT:
            return {
                ...state,
                current_index: action.data,
            };
        case ADD_CAT:
            console.log(action.data)
            return {
                ...state,
                cat: [...state.cat, cat(action.data)],
            };
        default:
            return state;
    }
};

export default reducer
