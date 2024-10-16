import React from "react";
import Perks from "../Perks";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function PlacesPage() {
  const action = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl  mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">
        {text}
      </p>
      
    );
  }

  function preInput(header, description){
    return (
      <>
      {inputHeader(header)}
      {inputDescription(description)}

      </>

    )
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('upload-by-link', { link: photoLink }, { withCredentials: true });
      const filename = data.filePath; // Extract the filename from the API response
      setAddedPhotos(prev => [...prev, filename]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }
  
  function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData()
    for(let i=0;i<files.length;i++){
      data.append('photos', files[i]);
    }
   
    axios.post('/upload', data,{
      headers:{'Content-Type': 'multipart/form-data'}
    }).then(response =>{
      const {data:filenames} = response;
      setAddedPhotos(prev => [...prev, ...filenames]);
    })
  }

  return (
    <div>
      {action.action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary inline-flex justify-center gap-1  text-white font-medium rounded-full px-6 py-2"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action.action === "new" && (
        <div>
          <form>
            {preInput('Title','Title for your place, should be short and catchy as in advertisement')}
            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="title, for example: My lovely Apartment"
            />
            {preInput('Address','Address to this place')}
            <input type="text"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
             placeholder="Address" />
            {preInput('Photos','more = better')}

            <div className="flex gap-2">
              <input type="text"
              value={photoLink}
              onChange={(e)=>setPhotoLink(e.target.value)}
               placeholder={"Add using a link .... jpg"} />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length>0 && addedPhotos.map(link =>(
                <div className="h-32 flex">
                 <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />

                </div>
              ))}
              <label className="h-32 cursor-pointer border items-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex justify-center gap-1">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {preInput('Description', 'description of the place')}
            <textarea className="resize-none" value={description} onChange={(e)=>setDescription(e.target.value)} />

            {preInput('Perks', 'select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Perks selected = {perks} onChange={setPerks}/>
            </div>

            {preInput('Extra Info', 'house rules, etc.')}
            <textarea className="resize-none" value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} />

            {preInput('Check in&out times', 'add check in and out times, remember to have some time window forcleaning the room between guests')}

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time </h3>
                <input type="text" 
                value={checkIn} 
                onChange={e=>setCheckIn(e.target.value)} 
                placeholder="14" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input type="text" 
                value={checkOut} 
                onChange={e=>setCheckOut(e.target.value)} 
                placeholder="11" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of Guests</h3>
                <input type="number"
                  value={maxGuests}
                  onChange={e=>setMaxGuests(e.target.value)} />
              </div>
            </div>


            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
