export const alternativeTitlesSelector = state => state.filmDetails.alternative_titles;
export const moreTitlesSelector = state => state.filmDetails.showTitles;

export const filmVideosSelector = state => state.filmDetails.filmVideos;

export const filmDetailsSelector = (state) => state.filmDetails.filmDetails;

export const reviewsSelector = (state) => state.filmDetails.reviews;

export const filmDetailsErrorSelector = state => state.filmDetails.filmDetailsError;
export const filmIsLoadingSelector = state => state.filmDetails.isLoading;



export const keywordsSelector = state => state.filmDetails.keywords;
export const changesSelector = state => state.filmDetails.changes;
export const castSelector = state => state.filmDetails.cast;
export const recommendationsSelector = state => state.filmDetails.recommendations;
export const similarSelector = state => state.filmDetails.similar;







export const testSelector = state => state.filmDetails.test;