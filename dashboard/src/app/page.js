'use client';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/redux/usersSlice";

export default function Home() {
  const [authorized, setAuthorized] = useState(null); // null = loading state
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
      dispatch(getUsers());
    }
  }, [dispatch]);
  useEffect(() => {
    if (authorized === false && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [authorized]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  if (authorized === null) return null;
  if (!authorized) {
    return (
      <dialog ref={modalRef} id="unauth_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Access Denied</h3>
          <p className="py-4">You must be an admin to view this page.</p>
        </div>
      </dialog>
    );
  }
  return (
    <div className="overflow-x-auto w-[60vw] h-[70vh] border-2 border-black m-auto overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan="6">{error}</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
