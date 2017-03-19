export const onSearchBarChange = function (searchTerm) {
	return {
		type : '@@SEARCH_BAR_CHANGE',
		payload : searchTerm
	}
}