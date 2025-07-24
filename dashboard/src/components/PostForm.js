'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "@/redux/postsSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const PostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user)
        {
            router.push('/login');
        }
        setUser(user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addPost({ title, body, userId : user.id })).unwrap();
            router.push('/');
        
        } catch (err) {
            alert('There is a problem');
        }
    };

    return (
        <form
  onSubmit={handleSubmit}
  className="w-3/5 md:w-2/5 h-[70vh] mx-auto my-10 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-4 justify-center"
>
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <input
    type="text"
    placeholder="Body"
    value={body}
    onChange={(e) => setBody(e.target.value)}
    required
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="submit"
    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:shadow-lg hover:cursor-pointer"
  >
    Submit
  </button>
</form>

    );
};

export default PostForm;