import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';

//import 'firebase/auth'


function App() {
  //DB表示関係
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
  const [user, setUser] = useState({
    mail: "未設定",
    address: "未設定",
    name: "未設定",
    id: -1
  });

  //DB削除関係
  const [id, setId] = useState<number>(99);
  const [documentPath, setdocumentPath] = useState<string>();

  //googleログイン関係
  const [g_user, setG_user] = useState<any>();

  //DB登録フラグ
  const [handleUser, setHandleUser] = useState<any>();

  //googleログアウト
  const logoutWithGoogle = () => {
    firebase.auth().signOut();
    window.location.href = '/';
  }

  //ユーザ取得
  const searchUsers = async () => {
    // Firestoreのコレクションを指定してデータ取得
    const res = await firebaseStore.collection('users').get();
    if (res.empty) return [];
    const userList: firebase.firestore.DocumentData[] = [];

    //未登録時ボタン
    setHandleUser(
      <button type="button" onClick={signup}>新規登録</button>
    );

    // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
    res.forEach((doc: any) => {
      userList.push(doc.data());
      if (doc.data().id == id) {
        setUser(doc.data());
        console.log(doc.id);
        setdocumentPath(doc.id);

        //登録時ボタン
        setHandleUser(
          <button type="button" onClick={removeUser}>ユーザ情報削除</button>
        );
      }
    })
    setUsers(userList);

  }

  //ユーザ削除
  const removeUser = async () => {
    try {
      console.log(documentPath);
      await firebaseStore.collection('users').doc(documentPath).delete();
    } catch (error) {
      console.log(error);
    }

    //window.location.reload();
  }

  useEffect(() => {

    searchUsers();

    //googleログイン
    firebase.auth().onAuthStateChanged((user: any) => {
      setG_user(user);
    })
  }, []);

  //ログアウトボタン，アイコン
  let userInfo;
  if (g_user != null) {
    userInfo =
      (
        <div>
          <button type="button" onClick={logoutWithGoogle}>Googleログアウト</button>
          <img src={g_user.photoURL} />
        </div>
      );
  }

  //新規登録
  const signup = () => {
    window.location.href = '/signup';
  }

  //新規登録，ユーザ情報削除
  //let handleUser;
  /*   if (user.id == -1) {
      handleUser = (
        <button type="button" onClick={signup}>新規登録</button>
      );
    } else {
      handleUser = (
        <button type="button" onClick={removeUser}>ユーザ情報削除</button>
      );
  
    } */

  return (
    <div className="App">
      <div className="App-header">

        {userInfo}

        <h1>マイページ</h1>
        {handleUser}
        <p>名前 : {user.name}</p>
        <p>住所 : {user.address}</p>
        <p>メールアドレス : {user.mail}</p>


      </div>
    </div>
  );
}

export default App;
