import React from 'react'
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="searchBar">
    <FiSearch/>

    <input type="text" placeholder='Search...'/>

    </div>

  )
}
