export const toggleNavMenu = (state={menuOpen: false}, action) => {
    switch (action.type) {
        case 'NAV_TOGGLE':
            return Object.assign({}, state, {menuOpen: !action.payload})
        default:
            return state
    }
}
