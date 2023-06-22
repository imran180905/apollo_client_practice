import { getNewsListQuery } from "@/queries/newAssetQueries";
import { useMutation, useQuery } from "@apollo/client";
import { deleteNewsAsset } from "@/queries/newAssetQueries";
import client from "@/graphqlClents/client";


export default function useDeleteNews(setCurrentPage:any,refetch:any){
    const [deleteNewsAssetFunction, { data, error, }] = useMutation(deleteNewsAsset, {
        fetchPolicy: "no-cache",
      })
      const handleDelete = async (id: string) => {
        
        deleteNewsAssetFunction({
          variables: {
            newsAssetId: id,
            confirmText: "Delete this news asset"
          }
        });
        refetch();
        // await client.refetchQueries({
        //   include: [getNewsListQuery],
        // //   include:"all",
        // });
        setCurrentPage(1);
      }
      return {handleDelete}
}