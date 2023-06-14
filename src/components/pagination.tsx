import client from "@/graphqlClents/client";
import { paginationQuery } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
const Pagination = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [sortedlist, setSortedlist] = useState([]);
  const [toggle, setToggle] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, error, data, fetchMore, refetch } = useQuery(
    paginationQuery,
    {
      variables: { page: currentPage, name: name },
      // fetchPolicy: "no-cache",
    }
  );
  var stringify = require("json-stable-stringify");

  console.log(data?.characters?.info.prev);
  console.log(data?.characters?.info.next);

  // const loadMoreCharacters = () => {
  //   fetchMore({
  //     variables: {
  //       // page: data.characters.info.next,
  //       page: 10,
  //     },
  //     updateQuery: (prevResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prevResult;

  //       return {
  //         characters: {
  //           ...fetchMoreResult.characters,
  //           results: [
  //             ...prevResult.characters.results,
  //             ...fetchMoreResult.characters.results,
  //           ],
  //         },
  //       };
  //     },
  //   });
  // };

  //   console.log(data?.characters?.results);
  const handlePre = () => {
    client.resetStore();
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleNameChange = (name: string) => {
    // refetch();
    setCurrentPage(1);
    setName(name);
  };
  // let sortData: any[][] = [];
  const handleSort = () => {
    const sortedResult = [...data?.characters?.results];
    sortedResult.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    setSortedlist(sortedResult);
    setToggle(!toggle);
  };
  console.log(sortedlist);
  return (
    <>
      {loading && <p>Loading........</p>}
      {!toggle ? (
        <div>
          {!loading &&
            data?.characters?.results?.map((character: any) => (
              <div key={character.id}>{character.name}</div>
            ))}
        </div>
      ) : (
        <div>
          {sortedlist &&
            sortedlist?.map((character: any) => (
              <div key={character.id}>{character.name}</div>
            ))}
        </div>
      )}
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

      <button onClick={handleSort}>Sort</button>
    </>
  );
};

export default Pagination;
