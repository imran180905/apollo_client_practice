import client from "@/graphqlClents/client";
import { paginationQuery } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
const Pagination = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, error, data, fetchMore, refetch } = useQuery(
    paginationQuery,
    {
      variables: { page: currentPage, name: name },
      fetchPolicy: "no-cache",
    }
  );

  const handlePre = () => {
    client.resetStore();
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleNameChange = (name: string) => {
    setCurrentPage(1);
    setName(name);
  };

  return (
    <>
      {loading && <p>Loading........</p>}

      <div>
        {!loading &&
          data?.characters?.results?.map((character: any) => (
            <div key={character.id}>{character.name}</div>
          ))}
      </div>

      {!loading && data?.characters?.results?.length == 0 && <div>No data</div>}
      {!loading && data.characters.info.next && (
        <button onClick={handleNext}>next</button>
      )}

      {!loading && data.characters.info.prev && (
        <button onClick={handlePre}>Prev</button>
      )}

      <br />
      <button onClick={() => handleNameChange("")}>reset</button>
      <br />
      <button onClick={() => handleNameChange("Morty")}>Morty</button>
      <br />
      <button onClick={() => handleNameChange("Rick")}>Rick</button>
      <br />
    </>
  );
};

export default Pagination;
