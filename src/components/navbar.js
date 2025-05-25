import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {
    const [showLogout, setShowLogout] = useState(false);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    return (
        <nav
            className={`${
                toggle ? "block" : "hidden"
            } sm:flex flex-col sm:flex-row items-center justify-between p-4 bg-[#d5e2f1] sm:relative absolute left-0 sm:left-auto top-0 w-full sm:w-auto`}
        >

            {!user && (
                <div className="flex">
                    <Link
                        to="/login"
                        onClick={() => setToggle(false)}
                        className="px-4 py-2 bg-[#002046] text-white rounded hover:bg-[#e67e08] font-semibold transition duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        onClick={() => setToggle(false)}
                        className="px-4 py-2 bg-[#d5e2f1] text-black rounded hover:bg-[#e67e08] font-semibold transition duration-300"
                    >
                        Register
                    </Link>
                </div>
            )}

           
            <ul
                className={`flex sm:space-x-4 flex-col sm:flex-row sm:justify-center ${
                    toggle ? "block" : "hidden"
                } sm:flex`}
            >
                <Link
                    to="/"
                    onClick={() => setToggle(false)}
                    className="px-6 py-3 text-gray-700 hover:text-[#e67e08] font-semibold transition duration-300"
                >
                    Home
                </Link>

                <Link
                    to="/posts"
                    onClick={() => setToggle(false)}
                    className="px-6 py-3 text-gray-700 hover:text-[#e67e08] font-semibold transition duration-300"
                >
                    Posts
                </Link>

                {user && (
                    <Link
                        to="/posts/create-post"
                        onClick={() => setToggle(false)}
                        className="px-6 py-3 text-gray-700 hover:text-[#e67e08] font-semibold transition duration-300"
                    >
                        Add Job
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
