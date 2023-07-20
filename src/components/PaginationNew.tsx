import { GET_CHARACTERS } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function PaginationNew() {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [totalP, setTotalP] = useState(0);

  const maxPageButtons = 4; // Maximum number of page buttons to display before and after ellipsis
  const { data, loading } = useQuery(GET_CHARACTERS, {
    variables: {
      page: currentPage,
      name: "",
      gender: "",
    },
    fetchPolicy: "no-cache",
  });
  console.log(data);
  useEffect(() => {
    setResult(data?.characters?.results);

    setTotalP(data?.characters?.info?.pages);
  }, [data]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pages = () => {
    const pageNumbers = [];

    // Calculate the range of pages to display
    const startPage = Math.max(1, currentPage);
    const endPage = Math.min(totalP, currentPage + maxPageButtons);
    console.log("start", startPage, "end", endPage);
    console.log(maxPageButtons);
    console.log("current", currentPage);

    // Loop to  show button
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          style={
            currentPage === i
              ? { ...buttonStyle, background: "#333", color: "#fff" }
              : buttonStyle
          }
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    if (startPage > 1) {
      pageNumbers.unshift(<span key="firstEllipsis">...</span>);
      pageNumbers.unshift(
        <button style={buttonStyle} key={1} onClick={() => handlePageClick(1)}>
          1
        </button>
      );
    }
    if (endPage < totalP) {
      pageNumbers.push(<span key="lastEllipsis">...</span>);
      pageNumbers.push(
        <button
          style={buttonStyle}
          key={totalP}
          onClick={() => handlePageClick(totalP)}
        >
          {totalP}
        </button>
      );
    }

    return pageNumbers;
  };
  return (
    <>
      <div>
        {loading && <div>loading...</div>}
        {!loading && data?.characters?.results?.length == 0 && (
          <div>No data</div>
        )}
        <div className="grid grid-cols-5">
          {!loading &&
            result &&
            result?.map((item: any, index) => {
              return (
                <div key={index}>
                  <h1>{item.name}</h1>
                  <h1>{item.species}</h1>
                  <h1>{item.gender}</h1>
                  <h1>{item.type}</h1>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
      <div>
        {/* with pagination data */}
        {/* {!loading && data?.characters.info.prev && (
          <button
            style={buttonStyle}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage == 1 ? true : false}
          >
            Prev
          </button>
        )}
        {renderPageNumbers()}
        {!loading && data?.characters.info.next && (
          <button
            style={buttonStyle}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage == totalP ? true : false}
          >
            Next
          </button>
        )} */}

        {/* without query pagination data */}
        {currentPage != 1 && (
          <button
            style={buttonStyle}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        )}
        {pages()}

        {currentPage != totalP && (
          <button
            style={buttonStyle}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalP}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

// Style
const buttonStyle = {
  margin: "0.5rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  background: "#f1f1f1",
  color: "#333",
  fontWeight: "bold",
  cursor: "pointer",
};
