import { gql } from "@apollo/client";

export const getNewsListQuery = gql`
query getRegisteredNewsAssetList( $searchWord: String, $pageNumber: Int, $perPage: Int) {
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
        assetcategory{
            id
            name
        }
        thirdPartyCategory{
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
}`