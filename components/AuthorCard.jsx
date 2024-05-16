import { useRouter } from 'next/navigation';
import React from 'react'


function AuthorCard({doctor }) {
    const router = useRouter();
    console.log(doctor)
  return (
    <div className="mx-auto my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
  <div className="mb-4 md:mr-6 md:mb-0">
    <img className="h-56 rounded-lg object-cover md:w-56" src={doctor.profileImage} alt="" />
  </div>
  <div className="">
    <p className="text-xl font-medium text-gray-400">{doctor.name}</p>
    <p className="mb-4 text-sm font-medium text-gray-400"> {doctor.gender}</p> 
    <div className="flex space-x-2">
      <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
        <p className="text-sm font-medium text-gray-500">Rating</p>
        <p className="text-3xl font-medium text-gray-600">{doctor.rating}</p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
        <p className="text-sm font-medium text-gray-500">Speciality</p>
        <p className="text-3xl font-medium text-gray-600">{doctor.speciality}</p>
      </div>
      <div className=""></div>
    </div>
    <div className="mb-3"></div>
    <div className="flex space-x-2">
      <button onClick={() => {
            window.open(`https://wa.me/${doctor.contact}?text=hi, I came from TheHealthApp`);
            console.log(doctor.contact, "doctor contact number");
          }}
      className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">Message</button>
      <button onClick={()=>router.push(`/doctors/${doctor.id}`)} className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">Visit</button>
    </div>
  </div>
</div>

  )
}

export default AuthorCard