import client from "@/graphqlClents/client";
import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import _ from 'lodash';




const NewsAssetAutoScroll = () => {
    const [name, setName] = useState('');
    const [loadfirst, setLoadfirst] = useState(false);
    const scrollingDivRef = useRef<HTMLDivElement>(null);
    const perPage = 20;

    const pageNumber = useRef(1);


    useEffect(() => {
        if (loading) setLoadfirst(true);


    }, [])


    const { loading, error, data, fetchMore } = useQuery(getNewsListQuery, {
        variables: {
            searchWord: name,
            pageNumber: 1,
            perPage: perPage,
        },
        notifyOnNetworkStatusChange: true,
    })
    console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

    const loadMoreCharacters = () => {
        setLoadfirst(false);
        pageNumber.current = pageNumber.current + 1;
        fetchMore({

            variables: {
                searchWord: name,
                pageNumber: pageNumber.current,
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
    const handleScroll = () => {
        if (scrollingDivRef.current) {
            if (
                scrollingDivRef?.current?.scrollTop + scrollingDivRef?.current?.clientHeight >=
                scrollingDivRef?.current?.scrollHeight
            ) {
                console.log("loading more characters....")
                loadMoreCharacters();
            }
        }

    };

    const handleChange = (e: any) => {
        setName(e.target.value)
    };

    const debouncedOnChange = _.debounce(handleChange, 1000)
    return (
        <div>
            news asset list

            <input type="text" onChange={debouncedOnChange} placeholder='search' />
            <div ref={scrollingDivRef} onScroll={handleScroll} className="h-screen overflow-y-scroll">
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
            </div>

            {loading && !loadfirst && <p>loading..</p>}
            {loading && loadfirst && <p>FirstLoading...</p>}

        </div>);
}

export default NewsAssetAutoScroll;