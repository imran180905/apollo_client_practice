import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CreateNewsAsset from "./CreateNewsAsset";
import UpdateNews from "./updateNews";

const NewsAssetList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(" ");

  const { loading, error, data, refetch } = useQuery(getNewsListQuery, {
    variables: {
      searchWord: "",
      pageNumber: currentPage,
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
  const handleEdit = (id: string) => {
    setId(id);
  };

  return (
    <>
      <div>
        {data?.getRegisteredNewsAssetList?.newsAssetList.map(
          (news: any, index: number) => {
            return (
              <div key={index}>
                <h1>{news.asseetName}</h1>
                <div>
                  <button onClick={() => handleEdit(news.newsAssetId)}>
                    Edit
                  </button>
                </div>

                <br />
              </div>
            );
          }
        )}
        <UpdateNews
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          newsAssetId={id}
        />
        <br />
        <CreateNewsAsset setCurrentPage={setCurrentPage} />
        <button onClick={handlePre}>Prev</button>
        <button onClick={handleNext}>next</button>
        <p>{currentPage}</p>
      </div>
    </>
  );
};

export default NewsAssetList;
