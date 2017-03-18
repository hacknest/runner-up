export const updateHeaderTitle = (title) => {
    return {
        type: '@@header/TITLE_UPDATE',
        payload: title
    }
}
