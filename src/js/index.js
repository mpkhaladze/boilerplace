import React from 'react'
import ReactDOM from 'react-dom'
import '../style.css'
import Avatar from '../maleUser.png'
// import _ from 'lodash'
function component() {
	const element = document.createElement('div');
	const avatar = new Image()
	avatar.src = Avatar

	element.innerHTML = 'Hello'
	element.classList.add('hello')
	element.appendChild(avatar)

	return element;
}

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<div>Entry Point </div>, wrapper) : false;
document.body.appendChild(component());
