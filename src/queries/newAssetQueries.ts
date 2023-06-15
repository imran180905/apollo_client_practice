import { gql } from "@apollo/client";

export const getNewsListQuery = gql`
  query getRegisteredNewsAssetList(
    $searchWord: String
    $pageNumber: Int
    $perPage: Int
  ) {
    getRegisteredNewsAssetList(
      searchWord: $searchWord
      pageNumber: $pageNumber
      perPage: $perPage
    ) {
      message
      newsAssetList {
        newsAssetId
        newsAssetOwnerId
        newsAssetOwnerEcomediaId
        asseetIcon
        asseetName
        assetURL
        publish_status
        acquiredsourcediscordnum
        acquiredsourcetelegramnum
        acquiredsourcewebnum
        accesspointnum
        assetcategory {
          id
          name
        }
        thirdPartyCategory {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

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
