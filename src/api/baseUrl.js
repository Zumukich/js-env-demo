export default function getBaseUrl() {
	const inDevelopment = window.location.hostname === "localhost";
	return inDevelopment ? "http://localhost:3001/" : "/";
	// return "http://localhost:3001";
}
