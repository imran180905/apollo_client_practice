import { deleteNewsAsset } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";

type propsType = {
  currentPage: number;
  setCurrentPage: (arg0: number) => void;
  newsAssetId: string;
};
export default function DeleteNews({
  currentPage,
  setCurrentPage,
  newsAssetId,
}: propsType) {
  const [deleteFunction, { data, loading }] = useMutation(deleteNewsAsset, {
    fetchPolicy: "no-cache",
  });

  return <div>D</div>;
}
