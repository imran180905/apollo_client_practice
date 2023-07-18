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



const getPageRange = () => {
    const pageRange = [];
    const maxPagesToShow = 5;
    let startPage = currentPage;

    if(currentPage >1 && currentPage< 4){
        startPage = 1;
    }else if ((totalP - currentPage) < Math.floor(maxPagesToShow / 2)) {
      startPage = totalP - maxPagesToShow + 1;
    } else if (currentPage > Math.ceil(maxPagesToShow / 2)) {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
    }

    for (let i = 0; i < maxPagesToShow; i++) {
      pageRange.push(startPage + i);
    }

    return pageRange;
  };
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

    const firstPage =() =>{
        setCurrentPage(1)
    }

    const lastPage =() =>{
        setCurrentPage(totalP);
    }

    const handleGender = (e: any) => {
        e.preventDefault();
        setGender(e.target.value)

    }

   

    return (<>
        <input type="text"
            placeholder='search ny name'
            onChange={handleChange}
            value={name}
        />
      
        <div onChange={handleGender}>
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Unknown" name="gender" /> Other
        </div>
        {/* <div onChange={handleChange}>
            <input type="radio" value="Rick" name="name" /> Rick
            <input type="radio" value="Morty" name="name" /> Morty

        </div> */}

        <button >sort by name</button>
        {loading && <div>loading...</div>}
        <div className='grid grid-cols-5'>
            {!loading && result && result?.map((item:any, index) => {
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
        <button className="button-pagination" onClick={firstPage} disabled={currentPage == 1 ? true : false}>&laquo;</button>
        <button className="button-pagination " onClick={prev} disabled={currentPage == 1 ? true : false}>&lt; </button>
            
            {getPageRange().map((page) => (
        <button  
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled = {page == currentPage ? true : false}
          className="button-pagination"
        >
          {page}
        </button>

      ))}
            <button className="button-pagination" onClick={next} disabled={nextP == null ? true : false}>&gt;</button>
            <button className="button-pagination " onClick={lastPage} disabled={nextP == null ? true : false}>&raquo;</button>
        </div>

      


        
    </>);
}

export default GetCharacter;