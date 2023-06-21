import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import CreateNewsAsset from "./CreateNewsAsset";
import UpdateNews from "./updateNews";

const NewsAssetList1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(" ");

  const { loading, error, data } = useQuery(getNewsListQuery, {
    variables: {
      searchWord: "",
      pageNumber: currentPage,
      perPage: 10,
    },
    fetchPolicy: "no-cache", // to not query data in cache and data fetched in every request
  });
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleEdit = (id: string) => {
    setId(id);
    console.log(id);
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
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>next</button>
        <p>{currentPage}</p>
      </div>
    </>
  );
};

export default NewsAssetList1;
