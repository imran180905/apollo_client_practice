import { gql } from "@apollo/client";

export const paginationQuery = gql`
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
// news Asset Apis

// Create user mutation

export const createUserQuery = gql`
  mutation CeateNewsAsset(
    $name: String!
    $url: String!
    $description: String
    $public_status: String!
    $newsAssetCategory: [String]
    $rss: [String]
  ) {
    createNewsAsset(
      name: $name
      url: $url
      description: $description
      public_status: $public_status # EVERYONE/APPROVAL_REQUIRED
      newsAssetCategory: $newsAssetCategory
      rss: $rss
    ) {
      message
      newsAssetId
    }
  }
`;
