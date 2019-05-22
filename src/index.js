import './style.css'
import Avatar from './maleUser.png'
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

document.body.appendChild(component());
