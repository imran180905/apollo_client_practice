import { useState } from "react";
import useFetchMore from "../hooks/useFetchMore";



const NewsAssetList = () => {
    const [loadfirst, setLoadfirst] = useState(false);
    const perPage = 10;
    const { debouncedOnChange, loadMoreCharacters, data, loading, name } =
        useFetchMore(perPage, setLoadfirst);

    return (
        <div>
            news asset list
            <input
                type="text"
                onChange={debouncedOnChange}

                placeholder="search"
            />
            {data?.getRegisteredNewsAssetList?.newsAssetList.map(
                (news: any, index: number) => {
                    return (
                        <div key={index}>
                            <h1>{news.asseetName}</h1>
                            <h1>{news.assetURL}</h1>
                            <br />
                        </div>
                    );
                }
            )}
            {/* before loading initial data */}
            {loading && loadfirst && <p>FirstLoading...</p>}
            {/* load more data */}
            {loading && !loadfirst && <p>loading..</p>}
            {/* show load more button after initial data is loaded and we have more data */}
            {!loading &&
                data?.getRegisteredNewsAssetList?.pagination?.currentPage !==
                data?.getRegisteredNewsAssetList?.pagination?.totalPages && (
                    <button onClick={loadMoreCharacters}>load more</button>
                )}
            {/* shows end of list when there in no more data to load */}
            {!loading &&
                data?.getRegisteredNewsAssetList?.pagination?.currentPage ===
                data?.getRegisteredNewsAssetList?.pagination?.totalPages && (
                    <p>End of list</p>
                )}
        </div>
    );
};

export default NewsAssetList;
