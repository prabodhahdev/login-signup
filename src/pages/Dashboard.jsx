import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      }
    };

    fetchUserData();
  }, [auth]);

  return (
    <div className="dashboard">
      <h1>Welcome, {userName ? userName : "User"}!</h1>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
