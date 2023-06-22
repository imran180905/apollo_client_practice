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
    });
    // refetch();
    await client.refetchQueries({
      include: [getNewsListQuery],
      //   include:"all",
    });
    setCurrentPage(1);
  };
  return { handleDelete };
}
