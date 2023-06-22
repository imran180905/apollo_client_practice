import client from "@/graphqlClents/client";
import { getNewsListQuery, updateNewsAsset } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

export const useUpdateNewsAsset = (
  newsAssetId: any,
  setCurrentPage: any,
  currentPage: any,
  toggleUpdateField: any,
  setToggleUpdateField: any
) => {
  const [UpdateNewsAsset, { loading, error }] = useMutation(updateNewsAsset, {
    fetchPolicy: "no-cache", //clear cache in every gql response
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      description: "",
      publicStatus: "",
      categories: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        UpdateNewsAsset({
          variables: {
            newsAssetId,
            name: values.name,
            url: values.url,
            description: values.description,
            public_status: values.publicStatus,
            newsAssetCategory: values.categories.split(","),
          },
        });

        resetForm();
        await client.refetchQueries({
          include: [getNewsListQuery],
          //   include: "active", // Refetch data after create
        });
        setCurrentPage(currentPage);
        setToggleUpdateField(!toggleUpdateField);
      } catch (error: any) {
        // Handle error
        console.error(error.message);
      }
    },
  });
  return {
    formik,
    loading,
    error,
  };
};
