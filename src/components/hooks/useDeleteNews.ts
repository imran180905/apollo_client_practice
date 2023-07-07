import client from "@/graphqlClents/client";
import { deleteNewsAsset, getNewsListQuery } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";

export default function useDeleteNews(setCurrentPage: any, refetch: any) {
  const [deleteNewsAssetFunction, { data, error }] = useMutation(
    deleteNewsAsset,
    {
      fetchPolicy: "no-cache", //clear cache in every gql response
    }
  );
  const handleDelete = async (id: string) => {
    deleteNewsAssetFunction({
      variables: {
        newsAssetId: id,
        confirmText: "Delete this news asset",
      },
    }).then((value) => {
      console.log("then 1")
      console.log(value)
      setCurrentPage(1);
      // Expected output: "Success!"
    }).then((value) => {
      console.log("then 2")
      console.log(value)
      refetch();
      // Expected output: "Success!"
    }).catch((error) => {
      console.log("catch error")
      console.log(error)
      // Expected output: "Success!"
    }).finally(() => {
      console.log("finally")
      
      // Expected output: "Success!"
    });
    ;
  
    // await client.refetchQueries({
    //   include: [getNewsListQuery],
    //   //   include:"all",
    // });
    
  };
  return { handleDelete };
}
