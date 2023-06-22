
import { useState } from "react";
import useFetch from "../hooks/usefetch";
import CreateNewsAsset from "./CreateNewsAsset";
import UpdateNews from "./updateNews";
import useDeleteNews from "../hooks/useDeleteNews";

const NewsAssetList1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(" ");
  const perPage = 10;
  const { debouncedOnChange, data, refetch } =
    useFetch(perPage, currentPage);

  const { handleDelete } = useDeleteNews(setCurrentPage, refetch)
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
        <input
          type="text"
          onChange={debouncedOnChange}
          // value={name}
          placeholder="search"
        />
        {data?.getRegisteredNewsAssetList?.newsAssetList.map(
          (news: any, index: number) => {
            return (
              <div key={index}>
                <h1>{news.asseetName}</h1>
                <div>
                  <button onClick={() => handleEdit(news.newsAssetId)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(news.newsAssetId)}>Delete</button>
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
