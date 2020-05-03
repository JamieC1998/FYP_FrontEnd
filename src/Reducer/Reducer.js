const initialState = {
    title: "Home",
    reload_contest_list: true,
}

function defaultReducer(state = initialState, action) {
    switch (action.type) {
        case "title_change":
            return { ...state, title: action.payload }
        case "set_contest_list":
            return { ...state, reload_contest_list: action.payload}
        default:
            return {...state}
    }
}

export default defaultReducer;