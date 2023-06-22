import { useUpdateNewsAsset } from "../hooks/useUpdateNews";

function UpdateNewsAsset({
  setCurrentPage,
  newsAssetId,
  currentPage,
  setToggleUpdateField,
  toggleUpdateField,
}: any) {
  const { formik, loading, error } = useUpdateNewsAsset(
    newsAssetId,
    setCurrentPage,
    currentPage,
    setToggleUpdateField,
    toggleUpdateField
  );

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Name"
        />
        <br></br>
        <input
          type="text"
          id="url"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          placeholder="URL"
        />
        <br></br>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Description"
        />
        <br></br>
        <div>
          <select
            name="publicStatus"
            value={formik.values.publicStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "block" }}
          >
            <option value="" label="Select a Status" />
            <option value="EVERYONE" label="EVERYONE" />
            <option value="APPROVAL_REQUIRED" label="APPROVAL_REQUIRED" />
          </select>
        </div>
        <br></br>
        <input
          type="text"
          id="categories"
          name="categories"
          value={formik.values.categories}
          onChange={formik.handleChange}
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
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
export default UpdateNewsAsset;
