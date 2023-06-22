import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function useFetch(
  perPage: number,
  currentPage: number,
  setLoadfirst: any
) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (loading) setLoadfirst(true);
  }, []);

  const { loading, error, data, fetchMore, refetch } = useQuery(
    getNewsListQuery,
    {
      variables: {
        searchWord: name,
        pageNumber: currentPage,
        perPage: perPage,
      },
      notifyOnNetworkStatusChange: true, // true: adds loading status true for initial load and load more, false: adds loading status true only on initial load
      fetchPolicy: "no-cache", // to not query data in cache and data fetched in every request
    }
  );
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const loadMoreCharacters = () => {
    setLoadfirst(false);

    fetchMore({
      variables: {
        searchWord: name,
        pageNumber:
          data?.getRegisteredNewsAssetList?.pagination?.currentPage + 1,
        perPage: perPage,
      },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getRegisteredNewsAssetList: {
            ...fetchMoreResult?.getRegisteredNewsAssetList,
            newsAssetList: [
              ...prevResult?.getRegisteredNewsAssetList?.newsAssetList,
              ...fetchMoreResult?.getRegisteredNewsAssetList?.newsAssetList,
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
  return {
    debouncedOnChange,
    loadMoreCharacters,
    data,
    loading,
    name,
    refetch,
  };
}
