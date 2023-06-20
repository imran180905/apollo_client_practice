import client from "@/graphqlClents/client";
import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import _ from 'lodash';



const NewsAssetList = () => {
    const [name, setName] = useState('');
    const [loadfirst, setLoadfirst] = useState(false);

    const perPage = 10;

    useEffect(() => {
        if (loading) setLoadfirst(true);
    }, [])

    const { loading, error, data, fetchMore } = useQuery(getNewsListQuery, {
        variables: {
            searchWord: name,
            pageNumber: 1,
            perPage: perPage,
        },
        notifyOnNetworkStatusChange: true, // true: adds loading status true for initial load and load more, false: adds loading status true only on initial load

    })
    console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

    const loadMoreCharacters = () => {
        setLoadfirst(false);

        fetchMore({
            variables: {
                searchWord: name,
                pageNumber: data?.getRegisteredNewsAssetList?.pagination?.currentPage + 1,
                perPage: perPage,
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
        {/* before loading initial data */}
        {loading && loadfirst && <p>FirstLoading...</p>}
        {/* load more data */}
        {loading && !loadfirst && <p>loading..</p>}
        {/* show load more button after initial data is loaded and we have more data */}
        {!loading && data?.getRegisteredNewsAssetList?.pagination?.currentPage !== data?.getRegisteredNewsAssetList?.pagination?.totalPages && <button onClick={loadMoreCharacters}>load more</button>}
        {/* shows end of list when there in no more data to load */}
        {!loading && data?.getRegisteredNewsAssetList?.pagination?.currentPage === data?.getRegisteredNewsAssetList?.pagination?.totalPages && <p>End of list</p>}


    </div>);
}

export default NewsAssetList;

