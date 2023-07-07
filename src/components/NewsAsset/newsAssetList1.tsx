import { useState } from "react";
import useDeleteNews from "../hooks/useDeleteNews";
import useFetch from "../hooks/usefetch";
import { useUpdateNewsAsset } from "../hooks/useUpdateNews";
import CreateNewsAsset from "./CreateNewsAsset";

const NewsAssetList1 = () => {

  const { debouncedOnChange, data, refetch, handleNext, handlePrev, setCurrentPage, currentPage } = useFetch();

  const { handleEdit, toggleUpdateField, formik, loading, error } = useUpdateNewsAsset();

  const { handleDelete } = useDeleteNews(setCurrentPage, refetch); // Delete custom hook call
  console.log(data?.getRegisteredNewsAssetList?.newsAssetList);



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
                  <button onClick={() => handleEdit(news)}>
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
          <div>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={formik?.values?.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Name"
              />
              {formik.errors.name && formik.touched.name && <p className="text-red-500">{formik.errors.name}</p>}
              <br></br>
              <input
                type="text"
                id="url"
                name="url"
                value={formik?.values?.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="URL"
              />
              {formik?.errors?.url && <p className="text-red-500">{formik.errors.url}</p>}
              <br></br>
              <textarea
                id="description"
                name="description"
                value={formik?.values?.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Description"
              />
              <br></br>
              <div>
                <select
                  name="publicStatus"
                  value={formik?.values?.publicStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ display: "block" }}
                >
                  <option value="" label="Select a Status" />
                  <option value="EVERYONE" label="EVERYONE" />
                  <option value="APPROVAL_REQUIRED" label="APPROVAL_REQUIRED" />
                </select>
              </div>
              {formik?.errors?.publicStatus && formik?.touched.publicStatus && <p className="text-red-500">{formik.errors.publicStatus}</p>}
              <br></br>
              <input
                type="text"
                id="categories"
                name="categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Categories (comma-separated)"
              />
              <br></br>

              <br></br>
              <button
                className="border p-2 bg-gray-200 mt-3 "
                type="submit"
                disabled={loading}
              >
                Update News Asset
              </button>
              {loading && <p>Loading...</p>}

            </form>
          </div>
        )}

        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>next</button>
        <p>{currentPage}</p>
      </div>
    </>
  );
};

export default NewsAssetList1;
