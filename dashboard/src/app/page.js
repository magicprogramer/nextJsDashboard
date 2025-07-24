'use client';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/redux/usersSlice";
import { deletePost, getPosts, getPostsByUser } from "@/redux/postsSlice";
import Link from "next/link";
import PieChartComponent from "@/components/PieChart";
export default function Home() {
  const [authorized, setAuthorized] = useState(null);
  const modalRef = useRef(null);
  const [pageNumber, setPage] = useState(1);
  const dispatch = useDispatch();
  const [sortedByPosts, setSortedByPosts] = useState(false);
  const handleSortingByPosts = async () => {
    console.log("OK");
    await dispatch(getPosts()).unwrap();
    setSortedByPosts(prev => !prev);}
  const router = useRouter();
  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const posts = useSelector((state) => state.posts.list);
  const postLoading = useSelector((state) => state.posts.loading);
  const postError = useSelector((state) => state.posts.error);
  const [selected, setSelected] = useState('users');
  const [searchByuser, setSearchByUser] = useState('');
  const paginatedPosts = posts.slice((pageNumber - 1) * 3, pageNumber * 3);
  const getUserById = (id) => users.find((user) => user.id === id);
  const userPostsCount = posts.reduce(
    (acc, post)=>{
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    },
    {});
  const sortedUsers = sortedByPosts ? [...users].sort((a, b) => userPostsCount[b.id] - userPostsCount[a.id]) : users;
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
  useEffect(()=>{
    const searchedName = searchByuser.trim().toLowerCase();
    console.log(searchedName);
    setPage(1);
    if (searchedName === '') {
      dispatch(getPosts());
    } else {
      const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchedName));
      console.log(filteredUsers[0]);
      dispatch(getPostsByUser(filteredUsers[0].id));
    }
  }, [searchByuser]);
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
    <div className="w-[60vw] h-[80vh] m-auto border-2 border-black overflow-scroll">
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
    <a 
    role="tab"
    className={`tab ${selected === 'pie' ? 'tab-active' : ''}`}
    onClick={() => setSelected('pie')}
    >
      posts distribution
    </a>
  </div>

  {/* Tab Content */}
  <div className="p-4 overflow-x-scroll h-full">
    {selected === 'pie' && (
      <PieChartComponent data={Object.entries(userPostsCount).map(([userId, count]) => ({
        name: users.find(u => u.id === +userId)?.name || `User ${userId}`,
        value: count,
      }))} />
    )}
    {selected === 'users' && (
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Role</th>
            <th> Number of posts
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={handleSortingByPosts}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>

               </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan="6">{error}</td></tr>
          ) : (
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td>{userPostsCount[user.id] || 0}</td>
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
      <div className="mb-4">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        placeholder="Search posts by username (real-time)"
        value={searchByuser}
        onChange={(e) => setSearchByUser(e.target.value)}
      />
     </div>
     <div>
        <table className="table table-zebra xs:w-[100vw] xs:overflow-x-scroll">
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
              paginatedPosts.map((post) => (
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
      </div>
        <div className="mt-4 flex justify-center">
          <button className="btn btn-primary ml-4" onClick={()=>{setPage(prev => Math.max(prev - 1, 1))}}>previous</button>
          
          <Link href="/posts/create" className="btn btn-primary">
            Add a Post
          </Link>
          <button className="btn btn-primary ml-4" onClick={()=>{setPage(prev => prev + 1)}}>next</button>
        </div>
      </>
    )}
  </div>
</div>

  );
}
