import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';


function App() {
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
  const [user, setUser] = useState({
    mail: "未設定",
    address: "未設定",
    name: "未設定",
    id: Number
  });

  const [mail, setMail] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [name, setName] = useState<string>();

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

    userList.forEach((u: any) => {
      if (u.id == 1) {
        setUser(u);
      }
    });
  }


  useEffect(() => {

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





  return (
    <div className="App">
      <div className="App-header">
        <h1>マイページ</h1>
        <p>名前 : {user.name}</p>
        <p>住所 : {user.address}</p>
        <p>メールアドレス : {user.mail}</p>
        <h1>新規登録</h1>
        <p>名前</p>
        <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <p>住所</p>
        <input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
        <p>メールアドレス</p>
        <input name="mail" type="text" value={mail} onChange={(e) => setMail(e.target.value)} /><br />
        <p>
          {name},{address},{mail}
        </p>
      </div>
    </div>
  );
}

export default App;
