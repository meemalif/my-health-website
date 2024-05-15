'use client'
import { auth } from '../../firebase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignInForm from './signinForm';

export default async function Login() {
  const router = useRouter()
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
  return <SignInForm />;
}
