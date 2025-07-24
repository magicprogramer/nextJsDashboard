'use client';

import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../redux/usersSlice';

export default function Home() {
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'tester',
    };
    dispatch(addUser(newUser));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddUser}
      >
        Add User
      </button>

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="border-b py-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
