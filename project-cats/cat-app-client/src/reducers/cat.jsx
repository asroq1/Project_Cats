<<<<<<< HEAD
export const initialState = {
    user: {
        isLoggedIn: true,
        user: 1
    },
    cat: [{
        cat_id: 1,
        user_id: 1,
        name: 'Garfield',
        gender: 'M',
        photo: 'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
        age: 3,
        Record: {
            cdt: '2021-03-30',
            wgt: 3.1
        }
    }]
}

const dummyCat = {
    cat_id: 2,
    user_id: 1,
    name: 'meme',
    gender: 'F',
    photo: 'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
    age: 5,
    Record: {
        cdt: '2021-03-30',
        wgt: 3.1
    }
}
export const ADD_CAT = 'ADD_CAT';
=======
export const initialState = {}
>>>>>>> d3ad080e30352dc0947da0bb4e090bb2e1c29218


export const addCat = (data) =>({
    type: ADD_CAT,
    data
})

const reducer = (state = initialState, action) => {
<<<<<<< HEAD
    switch (action.type) {
        case ADD_CAT:
            console.log('acted')
            console.log(state)
            return {
                ...state,
                cat: [dummyCat],
            };
        default:
            return state;
    }
};


=======
	switch (action.type) {
		// case _ACTION_NAME:
		//     return {
		//         //STATE CHANGE
		//         }
		default:
			return state
	}
}

>>>>>>> d3ad080e30352dc0947da0bb4e090bb2e1c29218
export default reducer
