import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import UserManager from "../user-manager";

function getNavForLoggedUser() {
	return <>
		<Link activeClassName={style.active} href="/">Home</Link>
		<Link activeClassName={style.active} href="/media">Media</Link>
		<Link activeClassName={style.active} href="/definition-editor">Definition
			editor</Link>
		<Link activeClassName={style.active} href="/logout">Logout</Link>
	</>;
}

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			{UserManager.getUserDetails() && getNavForLoggedUser()}
		</nav>
	</header>
);

export default Header;
