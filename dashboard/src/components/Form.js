'use client';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export function Form({ type = "login" }) {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "user",
        name: "",
        age: 0,
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "login") {
                await dispatch(login(form)).unwrap();
                if (form.role === "admin") router.push('/');
                else router.push('/posts/create');
                router.push('/');
            } else {
                await dispatch(register(form)).unwrap();
                router.push('/login');
            }
        } catch (err) {
            alert('There is a problem');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-3/5 md:w-2/5 h-[70vh] mx-auto my-10 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-4 justify-center"
        >
            {type === "register" && (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:shadow-lg hover:cursor-pointer"
            >
                {type === "login" ? "Login" : "Register"}
            </button>
        </form>
    );
}
