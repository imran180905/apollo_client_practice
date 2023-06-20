import client from "@/graphqlClents/client";
import { createNewsAsset, getNewsListQuery } from "@/queries/newAssetQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
type propstypes = {
  setCurrentPage: number;
};
export default function CreateNewsAsset({ setCurrentPage }: any) {
  const [name, setName] = useState<string>("");

  const [createNewsAssetFunction, { error, loading }] = useMutation(
    createNewsAsset,
    {
      fetchPolicy: "no-cache",
    }
  );

  const handleName = (e: any) => {
    e.preventDefault();
    const valueName = e.target.value;
    setName(valueName);
  };

  const handleCreate = async () => {
    createNewsAssetFunction({
      variables: {
        name: name,
        url: "https://footbahll.com",
        description: "football world cup",
        public_status: "EVERYONE",
        newsAssetCategory: ["football", "sports"],
        rss: ["https://prothom-alo.com/rss", "https://jugantor.com/rss"],
      },
    });
    setName("");

    await client.refetchQueries({
      // include: [getNewsListQuery]
      include: [getNewsListQuery],
    });
    setCurrentPage(1);
  };

  return (
    <div>
      {loading && <p>Loading.....</p>}
      {!loading && (
        <div>
          <input
            style={{ border: "1px solid purple", padding: "4px" }}
            onChange={handleName}
            placeholder="name"
            type="text"
            value={name}
          ></input>

          <button onClick={handleCreate}>Create</button>
        </div>
      )}
    </div>
  );
}
