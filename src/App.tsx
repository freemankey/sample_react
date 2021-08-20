import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';


function App() {
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
  const [user, setUser] = useState({
    mail: String,
    address: String,
    name: String,
    id: Number
  });




  useEffect(() => {
    const searchUsers = async () => {
      // Firestoreのコレクションを指定してデータ取得
      const res = await firebaseStore.collection('users').get();
      if (res.empty) return [];
      const userList: firebase.firestore.DocumentData[] = [];
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach(doc => {
        userList.push(doc.data());
      })
      setUsers(userList);

      console.log(users);


    }
    searchUsers();

    /*     const addUsers = async () => {
          const userRef = await firebaseStore.collection('users').add({
            name: "sato",
            address: "palau",
            mail: "o@gmial.com",
          })
    
          const userDoc = await userRef.get();
          console.log(userDoc.data());
        }
    
    
        addUsers(); */


  }, []);

  const userInfo = users.map((u: any) => {
    if (u.id == 1) {
      return u;
    }
  });


  console.log(userInfo);






  return (
    <div className="App">
      <div className="App-header">
        <h1>個人情報</h1>
        name: <p> {user.name}</p>
        address: <p> {user.address}</p>
        mail: <p> {user.mail}</p>


        <input type="text" />

        {
          users.map((user: any, index) => {
            return <p key={index}> {user.name}</p>
          })}

      </div>

    </div>
  );
}

export default App;
