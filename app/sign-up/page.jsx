'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import SignUpForm from './signupForm';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        router.push('/')
      } else {
        console.log(user?.displayName)
      }
    });
  }, []);

  return <SignUpForm />;
}
