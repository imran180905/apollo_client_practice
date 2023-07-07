import client from "@/graphqlClents/client";
import { getNewsListQuery, updateNewsAsset } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';

import useFetch from "./usefetch";

export const useUpdateNewsAsset = () => {
  const [toggleUpdateField, setToggleUpdateField] = useState(false);
  const [updateNews, setUpdateNews] = useState<any>(null);

  const {setCurrentPage} =useFetch();
  const handleEdit = (news: any) => {
    setUpdateNews(news);
    setToggleUpdateField(true);
  };
  
  const [UpdateNewsAsset, { loading, error }] = useMutation(updateNewsAsset, {
    fetchPolicy: "no-cache", //clear cache in every gql response
  });

const category = <string[]>[];
useEffect(()=>{
  if(updateNews){
    updateNews.assetcategory.map((item:any)=>{
      category.push(item.name)
    })
  }
},[updateNews])


  const formik:any = useFormik({
    initialValues: {
      name: updateNews?.asseetName|| "" ,
      url:  updateNews?.assetURL || "",
      description:  updateNews?.description || "",
      publicStatus:  updateNews?.publish_status || "",
      categories:  category.toString() || "",
    },
    onSubmit: async (values, { resetForm }) => {
   
        UpdateNewsAsset({
          variables: {
            newsAssetId:updateNews?.newsAssetId,
            name: values.name,
            url: values.url,
            description: values.description,
            public_status: values.publicStatus,
            newsAssetCategory:  values.categories.replace(" ","").split(","),
          },
        }).then(async() => {
          await client.refetchQueries({
            include: [getNewsListQuery],
          });
        }).then(() => {
            setCurrentPage(1);
        })
        .catch((error) => {
          console.log(error)
        }).finally(() => {
          console.log(values)
          resetForm({values:{
            name:  "",
            url:  "",
            description: "",
            publicStatus:   "",
            categories:""
          }});
          
        });;
       
        setToggleUpdateField(false) ;
    },
    enableReinitialize:true ,
    validationSchema: Yup.object({
      name: Yup.string().required('name required').max(100, 'maximum letters can be 100'),
      url: Yup.string().required('url required').matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ),
      publicStatus:Yup.string().required()
      
    }) 
    
  });
  return {
    formik,
    loading,
    error,
    handleEdit,
    toggleUpdateField
  };
};


