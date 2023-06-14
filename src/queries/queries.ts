import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!,$name:String!, $gender:String!) {
    characters(page: $page, filter: { name:$name ,gender:$gender }) {
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
        gender
      
      }
    }
  }
`;


