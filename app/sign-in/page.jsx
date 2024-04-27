import { auth } from '@/firebase';
import { redirect } from 'next/navigation';
import SignInForm from './signinForm';

export default async function Login() {
  const currentUser = auth.currentUser
  if (currentUser?.uid?.length>0) {
    console.log(currentUser.uid);
    redirect('/');
  }
  return <SignInForm />;
}
