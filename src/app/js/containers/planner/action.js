export const insertRoute = (route) => {
    return {
        type: '@@ROUTE_INSERT',
        payload: route
    }
}
