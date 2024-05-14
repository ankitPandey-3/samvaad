import React,{useContext} from 'react'
import { UserContext } from '../userContext';
import { Search, SearchCheck, SendHorizonal } from 'lucide-react'
import { Link } from 'react-router-dom';
import Card from '../Components/Card.jsx'
export function ChatPage() {
    const { username, user } = useContext(UserContext);
    return (
        <div className='flex bg-black justify-between h-screen'>
            <div className='w-1/3 bg-gray-700 p-2 text-white rounded-xl m-2 flex flex-col   '
                style={{ backgroundColor: '#212A31' }}>
                <div className='flex p-2'>
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder='Search'
                        className='flex-grow border border-gray-400 p-2 bg-gray-800 text-white placeholder-white rounded-md '
                    />
                    <button className='p-2'>
                        <Search className='text-white' />
                    </button>
                </div>
                <div className='p-4'>
                    <Card />
                    <Card />
                </div>
                
            </div>
            <div className='flex flex-col w-2/3 bg-gray-700 p-2 text-white rounded-xl m-2'
                style={{ backgroundColor: '#748D92' }}>
                <div className='flex-grow'>
                    <Link
                    to='/'>
                    <div className='flex justify-end'><img className='w-1/12' src={user.profileImage} alt="" /></div>
                    </Link>
                    
                    
                </div>
                <div className='flex p-2'>
                    <input
                        type="text"
                        placeholder='Type your message here'
                        className='flex-grow border border-gray-400 p-2 bg-gray-800 text-white placeholder-white rounded-md' />
                    <button className='p-2'>
                        <SendHorizonal className='text-white' />
                    </button>
                </div>

            </div>

        </div>
    )
}
