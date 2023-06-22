import { useState } from "react";

import useDeleteNews from "../hooks/useDeleteNews";
import useFetch from "../hooks/usefetch";
import CreateNewsAsset from "./CreateNewsAsset";
import UpdateNewsAsset from "./UpdateNewsAsset";

const NewsAssetList1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleUpdateField, setToggleUpdateField] = useState(false);

  const [id, setId] = useState(" ");
  const perPage = 10;
  const { debouncedOnChange, data, refetch } = useFetch(perPage, currentPage);

  const { handleDelete } = useDeleteNews(setCurrentPage, refetch); // Delete custom hook call
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleEdit = (id: string) => {
    setId(id);
    setToggleUpdateField(!toggleUpdateField);
    console.log(id);
  };

  return (
    <>
      <div>
        <input type="text" onChange={debouncedOnChange} placeholder="search" />
        {data?.getRegisteredNewsAssetList?.newsAssetList.map(
          (news: any, index: number) => {
            return (
              <div key={index}>
                <h1>{news.asseetName}</h1>
                <h1>{news.assetURL}</h1>
                <h1>{news.publish_status}</h1>

                <br />

                <div>
                  <button onClick={() => handleEdit(news.newsAssetId)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(news.newsAssetId)}>
                    Delete
                  </button>
                </div>

                <br />
              </div>
            );
          }
        )}

        <br />
        <CreateNewsAsset setCurrentPage={setCurrentPage} />
        <br />
        {toggleUpdateField && (
          <UpdateNewsAsset
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            newsAssetId={id}
            setToggleUpdateField={setToggleUpdateField}
            toggleUpdateField={toggleUpdateField}
          />
        )}

        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>next</button>
        <p>{currentPage}</p>
      </div>
    </>
  );
};

export default NewsAssetList1;
