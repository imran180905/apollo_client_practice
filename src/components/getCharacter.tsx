import { GET_CHARACTERS, } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';

const GetCharacter = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState('');
    const [result, setResult] = useState([]);
    const [nextP, setNextPage] = useState(2);
    const [prevP, setPrevPage] = useState<boolean | null>(null);
    const [totalP, setTotalP] = useState(0);
    const [gender, setGender] = useState<string>("")

    const { data, error, loading } = useQuery(GET_CHARACTERS, {
        variables: {
            page: currentPage,
            name: name,
            gender: gender
        }
    })

    useEffect(() => {
        // console.log(data)
        setResult(data?.characters?.results);
        console.log(result)
        setNextPage(data?.characters?.info?.next);
        setPrevPage(data?.characters?.info?.prev);
        setTotalP(data?.characters?.info?.pages);
    }, [data])


    const prev = () => {
        if (prev !== null) {
            setCurrentPage(currentPage - 1);
        }
    }

    const next = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleGender = (e: any) => {
        e.preventDefault();
        setGender(e.target.value)

    }

    const handleSort = (e: any) => {
        const sortedResult = [...result];
        sortedResult.sort((a, b) => {
            console.log(a);
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            } else {
                return 0
            }
        })
        setResult(sortedResult);
    }

    return (<div>
        <input type="text"
            placeholder='search ny name'
            onChange={handleChange}
            value={name}
        />
        {/* 
        <select name="" id="">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Unknown</option>
        </select> */}

        <div onChange={handleGender}>
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Unknown" name="gender" /> Other
        </div>
        {/* <div onChange={handleChange}>
            <input type="radio" value="Rick" name="name" /> Rick
            <input type="radio" value="Morty" name="name" /> Morty

        </div> */}

        <button onClick={handleSort}>sort by name</button>
        {loading && <div>loading...</div>}
        <div className='grid grid-cols-5'>
            {!loading && result && result?.map((item, index) => {
                return (
                    <div key={index}>
                        <h1 >{item.name}</h1>
                        <h1>{item.species}</h1>
                        <h1>{item.gender}</h1>
                        <h1>{item.type}</h1>
                        <br />
                    </div>
                )
            })

            }
        </div>
        <div className="flex">
            <button className="px-4 border-1 " onClick={prev} disabled={currentPage == 1 ? true : false}>prev </button>
            <button className="px-4 border-1 " onClick={() => setCurrentPage(1)} disabled={currentPage == 1 ? true : false}>1</button>
            <button className="px-4 border-1 " onClick={() => setCurrentPage(2)} disabled={currentPage == 2 ? true : false}>2</button>
            <p>...</p>
            <button className="px-4 border-1 " onClick={() => setCurrentPage(totalP - 2)} disabled={currentPage == totalP - 2 ? true : false}>{totalP - 2}</button>
            <button className="px-4 border-1 " onClick={() => setCurrentPage(totalP - 1)} disabled={currentPage == totalP - 1 ? true : false}>{totalP - 1}</button>
            <button className="px-4 border-1 " onClick={() => setCurrentPage(totalP)} disabled={currentPage == totalP ? true : false}>{totalP}</button>
            <button className="px-4 border-1 " onClick={next} disabled={nextP == null ? true : false}>next </button>
        </div>
    </div>);
}

export default GetCharacter;