import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';


function App() {
  //DB表示関係
  const [user, setUser] = useState({
    mail: "未設定",
    address: "未設定",
    name: "未設定",
    gmail: ""
  });

  //DB削除関係
  const [documentPath, setdocumentPath] = useState<string>();

  //googleログイン関係
  const [g_user, setG_user] = useState<any>();

  //DB登録ボタンフラグ
  const [flagUser, setflagUser] = useState<number>(0);


  //googleログアウト
  const logoutWithGoogle = () => {
    firebase.auth().signOut();
    window.location.href = '/';
  }

  //DB取得
  const searchUsers = async (user: any) => {
    // Firestoreのコレクションを指定してデータ取得
    const res = await firebaseStore.collection('users').get();

    //未登録時ボタンフラグ
    setflagUser(1);

    if (res.empty) return [];


    // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
    res.forEach((doc: any) => {
      if (doc.data().gmail == user.email) {
        setUser(doc.data());
        setdocumentPath(doc.id);

        //登録時ボタンフラグ
        setflagUser(2);
      }
    })
  }

  console.log(flagUser);
  //DB削除
  const removeUser = async () => {
    try {
      await firebaseStore.collection('users').doc(documentPath).delete();
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }

  useEffect(() => {

    //googleログイン
    firebase.auth().onAuthStateChanged((user: any) => {
      setG_user(user);
      searchUsers(user);
    })

  }, []);


  //ログアウトボタン，アイコン
  let userInfo;
  if (g_user != null) {
    userInfo =
      (
        <div>
          <button type="button" onClick={logoutWithGoogle}>ログアウト</button>
          <img src={g_user.photoURL} />
        </div>
      );
  }

  //新規登録
  const signup = () => {
    window.location.href = '/signup';
  }

  //DB登録＆削除ボタンの表示
  let viewbutton;
  if (flagUser == 1) {
    viewbutton = (
      <button type="button" onClick={signup}>新規登録</button>
    );
  } else if (flagUser == 2) {
    viewbutton = (
      <button type="button" onClick={removeUser}>ユーザ情報削除</button>
    );

  }


  return (
    <div className="App">
      <div className="App-header">

        {userInfo}

        <h1>マイページ</h1>
        {viewbutton}
        <p>名前 : {user.name}</p>
        <p>住所 : {user.address}</p>
        <p>メールアドレス : {user.mail}</p>

      </div>
    </div>
  );
}

export default App;
