import React from 'react'
import { useNavigate } from 'react-router-dom';
// icons
import { IoIosArrowBack } from "react-icons/io";
// components
import SinglePageHeader from '../components/SinglePageHeader';
import ChatSection from '../components/ChatSection';

const SingleListing = () => {
    const navigate = useNavigate();

  return (
    <>
        {/* back button */}
        <button className='primary-button back-button' onClick={() => navigate(-1)}>
            <IoIosArrowBack />
            Back
        </button>

        {/* single page header */}
        <SinglePageHeader/>

        {/* chat */}
        <ChatSection/>
    </>
  )
}

export default SingleListing
