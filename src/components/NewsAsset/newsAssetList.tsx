import client from "@/graphqlClents/client";
import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import _ from 'lodash';



const NewsAssetList = () => {
    const [name, setName] = useState('');
    const [loadfirst, setLoadfirst] = useState(false);

    useEffect(() => {
        if (loading) setLoadfirst(true);
    }, [])

    const { loading, error, data, fetchMore } = useQuery(getNewsListQuery, {
        variables: {
            searchWord: name,
            pageNumber: 1,
            perPage: 10,
        },
        notifyOnNetworkStatusChange: true,
    })
    console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

    const loadMoreCharacters = () => {
        setLoadfirst(false);

        fetchMore({
            variables: {
                searchWord: name,
                pageNumber: data?.getRegisteredNewsAssetList?.pagination?.currentPage + 1,
                perPage: 10,
            },

            updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult;
                return {
                    getRegisteredNewsAssetList: {
                        ...fetchMoreResult.getRegisteredNewsAssetList,
                        newsAssetList: [
                            ...prevResult.getRegisteredNewsAssetList.newsAssetList,
                            ...fetchMoreResult.getRegisteredNewsAssetList.newsAssetList,
                        ],
                    },
                };
            },

        });



    };

    const handleChange = (e: any) => {
        setName(e.target.value)
    };

    const debouncedOnChange = _.debounce(handleChange, 1000)
    return (<div>
        news asset list

        <input type="text" onChange={debouncedOnChange} placeholder='search' />
        {
            data?.getRegisteredNewsAssetList?.newsAssetList.map((news: any, index: number) => {
                return (
                    <div key={index}>
                        <h1>{news.asseetName}</h1>
                        <h1>{news.assetURL}</h1>
                        <br />
                    </div>
                )
            })
        }
        {loading && !loadfirst && <p>loading..</p>}
        {loading && loadfirst && <p>FirstLoading...</p>}
        {!loading && data?.getRegisteredNewsAssetList?.pagination?.currentPage !== data?.getRegisteredNewsAssetList?.pagination?.totalPages && <button onClick={loadMoreCharacters}>load more</button>}
        {!loading && data?.getRegisteredNewsAssetList?.pagination?.currentPage === data?.getRegisteredNewsAssetList?.pagination?.totalPages && <p>End of list</p>}


    </div>);
}

export default NewsAssetList;

