import { useCreateNewsAsset } from "../hooks/useCreateNews";

function CreateNewsAsset({ setCurrentPage }: any) {
  const { formik, loading, error } = useCreateNewsAsset(setCurrentPage); // call create News Asset custom hook

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="mt-4"
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Name"
        />
        {formik.errors.name && formik.touched.name && <p className="text-red-500">{formik.errors.name}</p>}
        <br></br>
        <input
          className="mt-4"
          type="text"
          id="url"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="URL"
        />
        {formik.errors.url && formik.touched.url && <p className="text-red-500">{formik.errors.url}</p>}
        <br></br>
        <textarea
          className="mt-4"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        {formik.errors.publicStatus && formik.touched.publicStatus && <p className="text-red-500">{formik.errors.publicStatus && formik.errors.publicStatus}</p>}
        <br></br>
        <input
          className="mt-4 w-96"
          type="text"
          id="categories"
          name="categories"
          value={formik.values.categories}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Categories (comma-separated)"
        />
        <br></br>
        <input
          className="mt-4 w-96"
          type="text"
          id="rss"
          name="rss"
          value={formik.values.rss}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="RSS Feeds (comma-separated)"
        />
        {formik.errors.rss && formik.touched.rss && <p className="text-red-500">{formik.errors.rss && formik.errors.rss}</p>}
        <br></br>
        <button
          className="border p-2 bg-gray-200 mt-3 "
          type="submit"
          disabled={loading}
        >
          Create News Asset
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
export default CreateNewsAsset;
