import client from "@/graphqlClents/client";
import { createNewsAsset, getNewsListQuery } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

export const useCreateNewsAsset = (setCurrentPage: any) => {
  const [createNewsAssetMutation, { loading, error }] = useMutation(
    createNewsAsset,
    {
      fetchPolicy: "no-cache", //clear cache in every gql response
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      description: "",
      publicStatus: "",
      categories: "",
      rssFeeds: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        createNewsAssetMutation({
          variables: {
            name: values.name,
            url: values.url,
            description: values.description,
            public_status: values.publicStatus,
            newsAssetCategory: values.categories.split(","),
            rss: values.rssFeeds.split(","),
          },
        });

        setCurrentPage(1);

        await client.refetchQueries({
          include: [getNewsListQuery],
          //   include: "active",   // Refetch data after create
        });

        // Reset form field values after successful submission
        resetForm();
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
