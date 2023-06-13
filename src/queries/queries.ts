import { gql } from "@apollo/client";

export const paginationQuery = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
      }
    }
  }
`;

export const searchQuery = gql`
  query GetCharacters($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
      }
    }
  }
`;
// eslint-disable-next-line import/no-anonymous-default-export
// export default { PAGINATION, GET_CHARACTERS_QUERY };
