import React, { useState, useEffect } from 'react';
import './App.css';

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';

function SignUp() {
	//新規登録フォーム関係
	const [mail, setMail] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [id, setId] = useState<number>(99);

	//googleログイン関係
	const [g_user, setG_user] = useState<any>();

	//ユーザ追加
	const addUser = async () => {
		//console.log(name)
		console.log(id)
		const userRef = await firebaseStore.collection('users').add({
			gmail: g_user.email,
			name: name,
			address: address,
			mail: mail,
		})

		const userDoc = await userRef.get();
		console.log(userDoc.data());

		window.location.href = '/mypage';
	}

	useEffect(() => {

		//googleログイン
		firebase.auth().onAuthStateChanged((user: any) => {
			setG_user(user);
		})
	}, []);

	return (
		<div className="App">
			<div className="App-header">
				<h1>新規登録</h1>
				<form >
					<p>名前</p>
					<input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
					<p>住所</p>
					<input name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
					<p>メールアドレス</p>
					<input name="mail" type="text" value={mail} onChange={(e) => setMail(e.target.value)} /><br />

					<button type="button" onClick={addUser}>ユーザ情報登録</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;