const Footer = (id) => {
	const footer = document.getElementById(id);
	if (!footer) return;
	let innerHtml = `
	<div>
		<hr>
		<div class="horizontal">
			<div class="circle grey"></div>
			<p>Name of the Project</p>
		</div>
		<p>About</p>
		<p>Privacy</p>
	</div>
	`
	footer.innerHTML = innerHtml
}