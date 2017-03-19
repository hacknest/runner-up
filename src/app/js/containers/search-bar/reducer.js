const reducer = (searchTerm='', action) => {
    switch (action.type) {
        case '@@SEARCH_BAR_CHANGE':
            return action.payload
        default:
            return searchTerm
    }
}

export default reducer
