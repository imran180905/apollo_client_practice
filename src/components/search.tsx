import { searchQuery } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function Search() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);

  const [searchName, setSearchName] = useState(" ");
  const { loading, error, data, fetchMore } = useQuery(searchQuery, {
    variables: { page: currentPage, name: searchName },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target.elements.searchInput;
    setSearchName(value.trim());
    setCurrentPage(1);
    console.log(searchName);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchInput" placeholder="Search by name" />
        <button type="submit">Search</button>
      </form>
      {data?.characters?.results.map((character: any) => (
        <div key={character.id}>{character.name}</div>
      ))}
      {/* {data.characters.info.next && (
      <button onClick={loadMoreCharacters}>Load More</button>
    )} */}
    </div>
  );
}
