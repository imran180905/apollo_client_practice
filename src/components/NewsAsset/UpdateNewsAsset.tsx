import { Dispatch, SetStateAction } from "react";
import { useUpdateNewsAsset } from "../hooks/useUpdateNews";



function UpdateNewsAsset(formik: any, loading: any) {


  return (
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
  );
}
export default UpdateNewsAsset;
