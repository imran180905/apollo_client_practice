import client from "@/graphqlClents/client";
import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";



const NewsAssetList = () => {

    const { loading, error, data } = useQuery(getNewsListQuery, {
        variables: {
            searchWord: "",
            pageNumber: 1,
            perPage: 10
        }
    })
    console.log(data?.getRegisteredNewsAssetList?.newsAssetList)
    return (<div>
        news asset list
        {
            data?.getRegisteredNewsAssetList?.newsAssetList.map((news, index: number) => {
                return (
                    <div key={index}>
                        <h1>{news.asseetName}</h1>
                        <h1>{news.assetURL}</h1>
                        <br />
                    </div>
                )
            })
        }

    </div>);
}

export default NewsAssetList;