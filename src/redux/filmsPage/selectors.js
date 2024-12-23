export const filmsSelector = (state) => state.films.films;
export const isLoadingSelector = (state) => state.films.isLoading;
export const isErrorSelector = (state) => state.films.isError;
export const totalPagesSelector = (state) => state.films.total_pages;
export const filterVariantSelector = (state) => state.films.filterVariant
export const isOpenSelector = (state) => state.films.isOpen;

export const selectUpcoming = (state) => state.films.upcoming;
