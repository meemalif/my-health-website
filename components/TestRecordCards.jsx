import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
// import { auth, firestore } from "../../firebase"; // Adjust the path as necessary


const TestRecordsCard = () => {
  const [initialEntries, setInitialEntries] = useState(5);
  const [bpData, setBpData] = useState([]);
  const [bsData, setBsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data here
      const uid = auth.currentUser.uid;
      const userQuery = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userID = userDoc.id;
      console.log(userID);
      const bloodPressureRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodPressure"
      );
      const bloodSugarRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodSugar"
      );
      const bpQuery = query(bloodPressureRef, orderBy("createdAt", "desc"));
      const bsQuery = query(bloodSugarRef, orderBy("createdAt", "desc"));

      const bpSnapshot = await getDocs(bpQuery);
      const bsSnapshot = await getDocs(bsQuery);

      const bpData = bpSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBpData(bpData);

      const bsData = bsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBsData(bsData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Test Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Pressure-mmHg
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Sugar-mg/dL
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bpData.slice(0, initialEntries).map((bpRow, index) => {
              const bsEntry = bsData.find((bsRow) => {
                const bpDate = bpRow.createdAt.toDate().setHours(0, 0, 0, 0);
                const bsDate = bsRow.createdAt.toDate().setHours(0, 0, 0, 0);
                return bpDate === bsDate;
              });
              const bloodSugarValue = bsEntry ? bsEntry.bloodSugar : "N/A";

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bpRow.createdAt.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {`${bpRow.systolic}/${bpRow.diastolic}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {bloodSugarValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => setInitialEntries(initialEntries + 5)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default TestRecordsCard;
