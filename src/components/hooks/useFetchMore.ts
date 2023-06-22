import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

export default function useFetchMore(perPage: number, setLoadfirst: any) {
  const [name, setName] = useState("");
  const pageNumber = useRef(1);

  useEffect(() => {
    if (loading) setLoadfirst(true);
  }, []);

  const { loading, error, data, fetchMore } = useQuery(getNewsListQuery, {
    variables: {
      searchWord: name,
      pageNumber: 1,
      perPage: perPage,
    },
    notifyOnNetworkStatusChange: true, // true: adds loading status true for initial load and load more, false: adds loading status true only on initial load
    
  });
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const loadMoreCharacters = () => {
    setLoadfirst(false);
    pageNumber.current = pageNumber.current + 1;
    console.log(pageNumber.current)
    fetchMore({
      variables: {
        searchWord: name,
        pageNumber:pageNumber.current,
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
    setName(e.target.value);
  };

  const debouncedOnChange = _.debounce(handleChange, 1000);
  return { debouncedOnChange, loadMoreCharacters, data, loading, name };
}