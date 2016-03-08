class TitleComponent extends React.Component {
	render () {
		return <figure>
			<img src="{this.props.src" alt="{this.props.title}"/>
			<figcaption>{this.props.title}</figcaption>
		</figure>;
	}
}