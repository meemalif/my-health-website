'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavbarComponent from './navbarComponent';
// Assuming you have a Firebase config file where Firebase is initialized
import { auth } from '@/firebase';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

function Navbar() {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const db = getFirestore(); // Initialize Firestore

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            console.log("User logged in:", user);
            setUser(user);
    
            // Properly setting up Firestore collection reference
            const userRef = collection(db, "users"); // Use the initialized Firestore instance
            const userQuery = query(userRef, where("userID", "==", user.uid));
    
            // Executing the query and handling the promise
            getDocs(userQuery)
              .then(snapshot => {
                if (!snapshot.empty) {
                  console.log("Checking user data:", snapshot.docs[0].data());
                  setUserData({
                    ...snapshot.docs[0].data(),
                    id: snapshot.docs[0].id
                  });
                } else {
                  console.log("No user data found.");
                }
              })
              .catch(error => console.error("Failed to fetch user data:", error));
          } else {
            console.log("No user logged in");
          }
        });
    
        // Cleanup function to unsubscribe from the listener on component unmount
        return () => unsubscribe();
      }, [db]); // Add db as a dependency to useEffect

  return <NavbarComponent data={user} userData={userData} />;
}

export default Navbar;
