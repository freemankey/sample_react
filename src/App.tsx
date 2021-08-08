import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';


function App() {
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);

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

  useEffect(() => {

  }, []);

  searchUsers();

  return (
    <div className="App">
      <div className="App-header">
        {
          users.map((user: any, index) => {
            return <p key={index}> {user.name}</p>
          })}

      </div>
    </div>
  );
}

export default App;
