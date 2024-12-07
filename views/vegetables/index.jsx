const React = require("react");
class Index extends React.Component {
	render() {
		const { vegetables } = this.props;
		return (
			<>
				<nav>
					<a href="/vegetables/new">Create a New Vegetable</a>
				</nav>
				<ul>
					{vegetables.map((Vegetable, i) => {
						return (
							<li>
								The{" "}
								<a href={`api/vegetables/${Vegetable._id}`}>{Vegetable.name}</a>{" "}
								is {Vegetable.color}
								<br></br>
								{Vegetable.readyToEat
									? `It is ready to eat`
									: `It is NOT ready to eat`}
								<br />
								<a href={`/vegetables/${Vegetable._id}/edit`}>
									Edit this vegetable
								</a>
								<form
									action={`api/vegetables/${Vegetable._id}?_method=DELETE`}
									method="POST"
								>
									<input type="submit" value="DELETE" />
								</form>
							</li>
						);
					})}
				</ul>
			</>
		);
	}
}
module.exports = Index;
