const reducer = (state=null, action) => {
    switch (action.type) {
        case '@@header/TITLE_UPDATE':
            return action.payload
        default:
            return state
    }
}

export default reducer
