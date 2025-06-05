import React,{ useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchBar = ()=> {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    
    // const searchCountry = (e) =>{
    //     e.preventDefault();
    //     const searchTerm = e.target.value
    //     setSearchText(searchTerm);
    //     dispatch({type: 'filter_by_name', value: searchTerm || [] });
    // }
    // const resetSearch =()=>{
    //     setSearchText("");
    //     dispatch({type: 'display_all_items'});
    // }
    return (
        <form
            // onSubmit={searchCountry}
            autoComplete="off"
        >
            <div className="mx-5 p-2 rounded bg-white align-items-center justify-content-between  "
            >
                <i className="bi bi-search"></i>
                <input
                    type="text"
                    className="mx-4 border-0 outline-none "
                    placeholder="Search for a task..."
                    value={searchText}
                    // onChange={searchCountry}
                    aria-label="Search for a task"
                />
                <div className="px-4">
                    {searchText !== "" && (
                        <button
                            type="button"
                            className="cursor-pointer"
                            // onClick={resetSearch}
                        >
                            {/* <img 
                                className="" 
                                src={iconCross.src} alt="cross icon" 
                                width="15px" height="15px"    
                            /> */}
                        </button>                    
                    )}
                </div>
            </div>
        </form>
    )
}

export default SearchBar;