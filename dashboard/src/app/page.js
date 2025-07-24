'use client';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/redux/usersSlice";
import { deletePost, getPosts } from "@/redux/postsSlice";
import Link from "next/link";
export default function Home() {
  const [authorized, setAuthorized] = useState(null); // null = loading state
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const posts = useSelector((state) => state.posts.list);
  const postLoading = useSelector((state) => state.posts.loading);
  const postError = useSelector((state) => state.posts.error);
  const [selected, setSelected] = useState('users');
  const getUserById = (id) => users.find((user) => user.id === id);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
      dispatch(getUsers());
      dispatch(getPosts());
    }
  }, [dispatch]);
  useEffect(() => {
    if (authorized === false && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [authorized]);
  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  }
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
    <div className="w-[60vw] h-[70vh] m-auto border-2 border-black">
  {/* Tabs Header */}
  <div className="tabs tabs-lift justify-center">
    <a
      role="tab"
      className={`tab ${selected === 'users' ? 'tab-active' : ''}`}
      onClick={() => setSelected('users')}
    >
      Users
    </a>
    <a
      role="tab"
      className={`tab ${selected === 'posts' ? 'tab-active' : ''}`}
      onClick={() => setSelected('posts')}
    >
      Posts
    </a>
  </div>

  {/* Tab Content */}
  <div className="p-4 overflow-x-auto">
    {selected === 'users' && (
      <table className="table table-zebra w-full">
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
    )}

    {selected === 'posts' && (
      <>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Body</th>
              <th>Username</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="6">{error}</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <th>{post.id}</th>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{getUserById(post.userId)?.name || "Unknown"}</td>
                  <td>{post.createdAt}</td>
                  <td>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Link href="/posts/create" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
      </>
    )}
  </div>
</div>

  );
}
