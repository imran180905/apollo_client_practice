import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
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

export default NewsAssetList;
