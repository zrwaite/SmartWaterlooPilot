const Navbar = (id) => {
	const navbar = document.getElementById(id);
	if (!navbar) return;
	let innerHtml = `
	<div class="navbar">
		<div class="leftNav">
			<div class="grey circle h6"></div>
			<h6>Name of the Project</h6>
		</div>
		<div class="rightNav">
			<img class="h6 imageButton" src="images/menu.svg"/>
		</div>
	</div>
	`
	navbar.innerHTML = innerHtml
}