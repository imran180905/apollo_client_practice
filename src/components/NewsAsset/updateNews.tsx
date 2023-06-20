import client from "@/graphqlClents/client";
import { getNewsListQuery, updateNewsAsset } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
type propsType = {
  currentPage: number;
  setCurrentPage: (arg0: number) => void;
  newsAssetId: string;
};
export default function UpdateNews({
  currentPage,
  setCurrentPage,
  newsAssetId,
}: propsType) {
  console.log(newsAssetId);

  const [name, setName] = useState<string>("");

  const [updateNewsAssetFunction, { error, loading }] = useMutation(
    updateNewsAsset,
    {
      fetchPolicy: "no-cache", // @TODO comment here
    }
  );
  const handleName = (e: any) => {
    e.preventDefault();
    const valueName = e.target.value;
    setName(valueName);
  };
  console.log(name);

  const handleUpdate = async () => {
    updateNewsAssetFunction({
      variables: {
        newsAssetId: newsAssetId,
        name: name,
        url: "https://nodejs-news-asset.com/",
        description: "",
        public_status: "EVERYONE", // EVERYONE/APPROVAL_REQUIRED
        newsAssetCategory: ["es6", "node-js", "javascript"], // @TODO Multi selection
      },
    });
    setName("");

    await client.refetchQueries({
      include: [getNewsListQuery],
    });
    setCurrentPage(currentPage);
  };

  return (
    <>
      <div>
        <input
          onChange={handleName}
          placeholder="name"
          type="text"
          value={name}
        ></input>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
}