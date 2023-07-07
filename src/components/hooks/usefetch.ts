import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useState } from "react";

export default function useFetch() {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage]= useState(10);

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
  console.log(data)

  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const debouncedOnChange = _.debounce(handleChange, 1000);

  return { debouncedOnChange, data, loading, name, refetch,handlePrev,handleNext ,setCurrentPage,currentPage};
}
