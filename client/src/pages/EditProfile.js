import { useParams } from 'react-router-dom';
import {QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default function EditProfile() {
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { userId: id },
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {

    }

    if (loading) {
        //insert loading bar
        return <div>LOADING</div>
    }

    const user = data?.user || {};
    let editedUser = {...user};
    console.log(user);

    return (
        <form onSubmit={handleSubmit}>
        <div className="mt-10 sm:mt-0">
            <div className="md:flex justify-center mt-[45px]">
                <div className="mt-[45px] md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                        <input type="text" name="first-name" id="first-name" value={editedUser.firstName} autoComplete="given-name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                        <input type="text" name="last-name" id="last-name" value={editedUser.lastName} autoComplete="family-name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                        <input type="text" name="username" id="username" value={editedUser.username} autoComplete="username" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <input type="text" name="email" id="email" value={editedUser.email} autoComplete="email" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                        <input type="text" name="phone-number" id="phone-number" value={editedUser.phoneNumber} autoComplete="phone-number" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </form>

    )
}
