import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Context Import
import { useListingContext } from '../hooks/useListingContext'

// Icon Import
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL

const ListingDetails = ({listing}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(listing.listing_title);
    const [editSize, setEditSize] = useState(listing.shoe_size);
    const [editCountrySize, setEditCountrySize] = useState(listing.country_size);
    const [editLocation, setEditLocation] = useState(listing.location);
    const [editPrice, setEditPrice] = useState(listing.price);
    const [editCondition, setEditCondition] = useState(listing.condition);
    const [editBrand, setEditBrand] = useState(listing.shoe_brand);
    const [editCategory, setEditCategory] = useState(listing.gender_category);

    const { dispatch } = useListingContext();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.username : null;

    // Handle Navigate
    const handleNavigate = () => {
        let path = `/${listing._id}`;
        navigate(path);
    };

    // Handle Delete
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${baseURL}/api/listings/${listing._id}`)
            if(response.status === 200) {
                dispatch({type: 'DELETE_LISTING', payload: listing});
            }
        } catch (error) {
        }
    };

    // Handle Edit
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Handle Submit Edit
    const handleSubmitEdit = async () => {
        const updatedListing = {
            listing_title: editTitle,
            shoe_brand: editBrand,
            shoe_size: editSize,
            country_size: editCountrySize,
            location: editLocation,
            price: editPrice,
            condition: editCondition,
            category: editCategory,
        };
    
        try {
            const response = await axios.patch(`${baseURL}/api/listings/${listing._id}`,
                updatedListing
            );
            
            if (response.status === 200) {
                dispatch({ type: 'UPDATE_LISTING', payload: response.data });
                setIsEditing(false);
            }
    
        } catch (error) {
            console.log("Error updating listing", error);
        }
    };
    

    // Handle Cancel edit
    const handleCancelEdit = () => {
        setEditTitle(listing.listing_title)
        setEditSize(listing.shoe_size)
        setEditCountrySize(listing.country_size)
        setEditLocation(listing.location)
        setEditPrice(listing.price)
        setEditCondition(listing.condition)
        setEditCategory(listing.gender_category)
        setIsEditing(false);
    }

    return (
        <div className='listing-details'>
            {isEditing ? (
                <div className='edit-listing'>
                    <form className='edit-form'>
                        <h3>Edit Your Item</h3>

                        <div className='edit-filter-form-container'>
                            {/* Title */}
                            <div className='form-filter'>
                                <label>Title:</label>
                                <input
                                    type='text'
                                    value={editTitle}
                                    maxLength={20}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </div>

                            {/* Location */}
                            <div className='form-filter'>
                                <label>Location:</label>
                                <input
                                    type='text'
                                    value={editLocation}
                                    maxLength={30}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                />
                            </div>

                            {/* Brand */}
                            <div className='form-filter'>
                                <label htmlFor="brand">Brand:<span>*</span></label>
                                <select type='text' onChange={(e) => setEditBrand(e.target.value)} value={editBrand} required>
                                    <option value='Adidas'>Adidas</option>
                                    <option value='Converse'>Converse</option>
                                    <option value='Crocs'>Crocs</option>
                                    <option value='Jordan'>Jordan</option>
                                    <option value='New Balance'>New Balance</option>
                                    <option value='Nike'>Nike</option>
                                    <option value='Puma'>Puma</option>
                                    <option value='Reebok'>Reebok</option>
                                    <option value='Timberland'>Timberland</option>
                                    <option value='Ugg'>Ugg</option>
                                    <option value='Vans'>Vans</option>
                                </select>
                            </div>

                            {/* Size */}
                            <div className='form-filter'>
                                <label>Size:</label>
                                <div className='size-filter'>
                                    <input
                                        type='text'
                                        value={editSize}
                                        maxLength={3}
                                        onChange={(e) => setEditSize(e.target.value)}
                                    />
                                    <select type='text' onChange={(e) => setEditCountrySize(e.target.value)} value={editCountrySize} required>
                                        <option value='US'>US</option>
                                        <option value='UK'>UK</option>
                                        <option value='EURO'>EURO</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div className='form-filter'>
                                <label>Price:</label>
                                <input
                                    type='text'
                                    value={editPrice}
                                    maxLength={15}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />
                            </div>

                            {/* Condition */}
                            <div className='form-filter'>
                                <label>Condition:</label>
                                <select type='text' value={editCondition} onChange={(e) => setEditCondition(e.target.value)}>
                                <option value='new'>New</option>
                                <option value='used-like-new'>Used - Like New</option>
                                <option value='used-good'>Used - Good</option>
                                <option value='used-fair'>Used - Fair</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className='form-filter'>
                                <label htmlFor="category">Category:<span>*</span></label>
                                <select type='text' onChange={(e) => setEditCategory(e.target.value)} value={editCategory} required>
                                    <option value=''>Please Select Category</option>
                                    <option value='Kids'>Kids</option>
                                    <option value='Mens'>Mens</option>
                                    <option value='Womans'>Womans</option>
                                    <option value='Unisex'>Unisex</option>
                                </select>
                            </div>
                        </div>

                        <div className='edit-form-buttons'>
                            <div className='delete-cancel-buttons'>
                                <button className='delete-button' onClick={handleDelete}>Delete Listing</button>
                                <button className='cancel-button' onClick={handleCancelEdit}>Cancel Changes</button>
                            </div>
                            <div className='save-listing-button'>
                                <button className='save-button' onClick={handleSubmitEdit}>Save Changes</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
                )
                : // If not editing
                (
                    <>
                        <div className='listing-card-border'>
                            <div className='listing-card'>
                                <div className='listing-image'>
                                    <img src={listing.listing_img} alt="Listing" />
                                </div>
                                <h3 className='shoe-price'>${listing.price}</h3>
                                <div className='listing-card-info'>
                                    <div className='listing-card-details'>
                                        <h2>{listing.listing_title}</h2>
                                        <p>Size: {listing.shoe_size} {listing.country_size}</p>
                                        <p>Brand: {listing.shoe_brand}</p>
                                        <p>Category: {listing.gender_category}</p>
                                        <p>{listing.location}, NZ</p>
                                    </div>

                                    <div className='listing-card-buttons'>
                                        <button className='view-button' onClick={handleNavigate}>View</button>
                                        {listing.user_id === user_id && (
                                            <>
                                                <div className='edit-delete-button'>
                                                    <FaEdit className='edit-icon'onClick={handleEdit}/>
                                                    <FaRegTrashAlt className='delete-icon'onClick={handleDelete}/>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ListingDetails