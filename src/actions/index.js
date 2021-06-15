import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach((id) => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
    // no await keyword because we don't care when exactly it came
    // However, forEach does not work with async/await, one would need to do
    // Promise.all(userIds.map(id => dispatch(fetchUser(id))))
};

export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data,
    });
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

// export const fetchUser = (id) => (dispatch) => {
//     _fetchUser(id, dispatch);
// };

// // Memoize in order to only fetch user once if one user wrote more than one post
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });
