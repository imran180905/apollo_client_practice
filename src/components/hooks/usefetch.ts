import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useState } from "react";

export default function useFetch(perPage: number, currentPage: number) {
  const [name, setName] = useState("");

  const { loading, error, data, refetch } = useQuery(getNewsListQuery, {
    variables: {
      searchWord: name,
      pageNumber: currentPage,
      perPage: perPage,
    },
    notifyOnNetworkStatusChange: true, // true: adds loading status true for initial load and load more, false: adds loading status true only on initial load
    fetchPolicy: "no-cache",
  });
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const debouncedOnChange = _.debounce(handleChange, 1000);

  return { debouncedOnChange, data, loading, name, refetch };
}
