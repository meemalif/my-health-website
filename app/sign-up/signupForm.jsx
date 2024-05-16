'use client';
import React from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '../../firebase';



function SignUpForm() {
  const router = useRouter()
  const handleRegister = async (formData) => {
    const values = {
      email: formData.get('email') ,
      password: formData.get('password'),
      fullname: formData.get('name'),
    }
    console.log(values)
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        

        sendEmailVerification(user)
          .then(() => {
            alert(
              "Verification Email sent",
              "Make sure to check your spam mails"
            );
          })
          .catch((error) => {
            alert("Error sending verification email: ", error);
          });

        const collectionRef = collection(firestore, "users");
        const docRef = await addDoc(collectionRef, {
          name: values.fullname,
          email: values.email,
          userID: user.uid,
          createdAt: new Date(),
        });
        // ("Document written with ID: ", docRef.id);
        alert("Congrats", "You have been registered to Health Harbor!");
        router.push("/")
      })
      .catch((error) => alert(error));
    return;
  };
  

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className=" h-12 rounded-full mr-2"
            src="/logo.png"
            alt="logo"
          />
          Health Harbor
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {/* Start of the form */}
            <form className="space-y-4 md:space-y-6" action="#" method="POST">
              {/* Form fields */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* Accept terms checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {/* Submission button */}
              <div className="flex items-center justify-center">
                <button type="submit" formAction={handleRegister}>
                  Sign Up
                </button>
              </div>
            </form>
            {/* End of the form */}
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-300 w-14"></span>
              <span className="text-gray-400 font-normal">
                or continue with <Link href={'/sign-in'}> Sign In</Link>
              </span>
              <span className="h-px bg-gray-300 w-14"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
