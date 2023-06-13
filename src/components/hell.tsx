import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import GET_CHARACTERS_QUERY from "../queries/queries";
const Hell = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: currentPage },
  });
  //   const { characters } = data;
  useEffect(() => {
    // console.log(data?.characters?.results);
  }, [data]);

  const pageSize = 10;

  const loadMoreCharacters = () => {
    fetchMore({
      variables: {
        page: data.characters.info.next,
        pageSize,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          characters: {
            ...fetchMoreResult.characters,
            results: [
              ...prevResult.characters.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        };
      },
    });
  };

  //   console.log(data?.characters?.results);
  const handlePre = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      {loading && <p>Loading........</p>}
      {!loading &&
        data?.characters?.results?.map((character: any) => (
          <div key={character.id}>{character.name}</div>
        ))}
      {!loading && data.characters.info.next && (
        <>
          <button onClick={handlePre}>previous</button>
          <button onClick={handleNext}>next</button>
          <br></br>
          <button onClick={loadMoreCharacters}>Load</button>
        </>
      )}
    </div>
  );
};

export default Hell;
