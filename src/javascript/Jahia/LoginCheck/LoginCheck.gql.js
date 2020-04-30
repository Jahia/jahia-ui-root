import gql from 'graphql-tag';

export const GetUserQuery = gql`query getCurrentUser {
    currentUser {
        name
    }
}`;
