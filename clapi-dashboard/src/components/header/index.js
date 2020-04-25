import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/media">Media</Link>
			<Link activeClassName={style.active} href="/definition-editor">Definition editor</Link>
			<Link activeClassName={style.active} href="/logout">Logout</Link>
		</nav>
	</header>
);

export default Header;
