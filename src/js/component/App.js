var React = require('react');

var Hello = React.createClass({
	handleClick: function(){
		location.href = '../src/demo.html';
	},
	render: function(){
		return (
			<div>Hello world! 
				<button onClick={this.handleClick}>go</button>
			</div>
		)
	}
});

module.exports = Hello;