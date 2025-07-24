'use client';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
export function Form({ type = "login" }) {
    const router= useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "login") {
            dispatch(login(form));
            router.push('/');
        } else {
            dispatch(register(form));
            router.push('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="submit">{type === "login" ? "Login" : "Register"}</button>
        </form>
    );
}
