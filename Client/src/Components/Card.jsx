import React,{ useEffect, useState } from 'react'

function Card({info, setSelectUserId, selectUserId}) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(
        ()=>{
            setIsSelected(selectUserId === info._id)
        },[selectUserId, info._id]
    );
    const handleClick = ()=>{
        setSelectUserId(info._id);
    }
    return (
        <div onClick={handleClick}>
            <div className={'w-full h-auto bg-opacity-15 rounded-md mt-3 mr-3 flex p-2 cursor-pointer hover:bg-gray-500 ' + (isSelected ? 'bg-white' : '')} >

                <div className='w-1/3 h-1/3'>
                    <img src={info.profileImage} alt="profileImage" className='w-1/2  rounded-full' />
                </div>
                <div>
                    <h1 className='text-white mt-4 text-2xl'>{info.fullName}</h1>
                </div>
            </div>


        </div>
    )
}

export default Card
