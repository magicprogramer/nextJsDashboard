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
        
        } catch (err) {
            alert('There is a problem');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;