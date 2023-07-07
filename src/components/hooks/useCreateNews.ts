import client from "@/graphqlClents/client";
import { createNewsAsset, getNewsListQuery } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from 'yup';


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
      rss: "",
    },
    onSubmit: async (values, { resetForm }) => {
     
        createNewsAssetMutation({
          variables: {
            name: values.name,
            url: values.url,
            description: values.description,
            public_status: values.publicStatus,
            newsAssetCategory: values.categories.replace(" ","").split(","),
            rss: values.rss.replace(" ","").split(","),
          },
        }).then(async(value) => {
          await client.refetchQueries({
            include: [getNewsListQuery],
          });
        }).then((value) => {
            setCurrentPage(1);
        })
        .catch((error) => {
          console.log(error)
        }).finally(() => {
          resetForm();  // Reset form field values after successful submission
        });
     
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name required').max(100, 'maximum letters can be 100'),
      url: Yup.string().required('url required').matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ),
      publicStatus:Yup.string().required(),
      rss:Yup.string().required('required field').min(1).trim().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'RSS URLには、半角英数字（0～9、a～z、A～Z）、ハイフン「-」、アンダースコア「_」のみを使用してください。').max(100, 'max value is  100')
    }) 
  });

  return {
    formik,
    loading,
    error,
  };
};
