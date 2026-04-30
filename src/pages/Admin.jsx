import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { entrepreneurs as mockEntrepreneurs } from '../data/mockData';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users (assuming they might be in a 'users' or 'entrepreneurs' collection)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const venturesSnap = await getDocs(collection(db, 'entrepreneurs'));
      const fundersSnap = await getDocs(collection(db, 'funders'));
      
      const v = venturesSnap.docs.map(doc => ({ id: doc.id, type: 'venture', ...doc.data() }));
      const f = fundersSnap.docs.map(doc => ({ id: doc.id, type: 'funder', ...doc.data() }));
      
      setUsers([...v, ...f]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSeedData = async () => {
    try {
      const batchPromises = mockEntrepreneurs.map(async (ent) => {
        const entRef = doc(db, 'entrepreneurs', ent.id);
        await setDoc(entRef, ent);
      });
      await Promise.all(batchPromises);
      alert('Seeded entrepreneurs successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Error seeding data.');
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const collectionName = type === 'venture' ? 'entrepreneurs' : 'funders';
      await deleteDoc(doc(db, collectionName, id));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleSeedData}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Seed Mock Data to Firebase
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.name || user.businessName || 'Unknown'}</div>
                    <div className="text-gray-500 text-sm">{user.email || user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.type === 'venture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(user.id, user.type)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
