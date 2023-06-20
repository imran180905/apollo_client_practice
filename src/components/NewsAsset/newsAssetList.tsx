import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
<<<<<<< HEAD
import _ from 'lodash';



const NewsAssetList = () => {
    const [name, setName] = useState('');

    const { loading, error, data, fetchMore } = useQuery(getNewsListQuery, {
        variables: {
            searchWord: name,
            pageNumber: 1,
            perPage: 10
        }
    })
    console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

    const loadMoreCharacters = () => {
        fetchMore({
            variables: {
                searchWord: name,
                pageNumber: data?.getRegisteredNewsAssetList?.pagination?.currentPage + 1,
                perPage: 10
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

    const debouncedOnChange = _.debounce(handleChange, 600)
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
        <button onClick={loadMoreCharacters}>load more...</button>
=======
import CreateUser from "./createUser";

const NewsAssetList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data, refetch } = useQuery(getNewsListQuery, {
    variables: {
      searchWord: "",
      page: currentPage,
      perPage: 10,
    },
    fetchPolicy: "no-cache",
  });
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const handlePre = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      news asset list refetch()
      {data?.getRegisteredNewsAssetList?.newsAssetList.map(
        (news: any, index: number) => {
          return (
            <div key={index}>
              <h1>{news.asseetName}</h1>
              <h1>{news.assetURL}</h1>
              <br />
            </div>
          );
        }
      )}
      <CreateUser setCurrentPage={setCurrentPage} />
      <button onClick={handlePre}>Prev</button>
      <button onClick={handleNext}>next</button>
      <p>{currentPage}</p>
    </div>
  );
};
>>>>>>> ffaa203332d2c5edc8d17e51f4a9dfac0c3a52ca

export default NewsAssetList;
