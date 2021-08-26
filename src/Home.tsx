import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

// firebase functions
import firebase from 'firebase';
import { firebaseStore } from './firebase/index';

function Home() {
	//googleログイン関係
	const [g_user, setG_user] = useState<any>();

	//googleログイン
	const signInWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (error) {
		}
	}


	const changepage = () => {
		window.location.href = '/mypage';
	}

	useEffect(() => {
		//googleログイン
		firebase.auth().onAuthStateChanged((user: any) => {
			setG_user(user);
		})
	}, []);


	if (g_user != null) {
		window.location.href = '/mypage';
	}

	return (
		<div className="App">
			<div className="App-header">

				<h1>ホームページ</h1>

				<img src="https://img.icons8.com/color/50/000000/google-logo.png" />
				<button type="button" onClick={signInWithGoogle}>ログイン</button>

			</div>
		</div>
	);
}

export default Home;