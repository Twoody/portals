'use strict';

class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.optionsArr	= [
			{title: 'Grapefruit'	, value:'grapefruit'},
			{title: 'Lime'			, value:'lime'		  },
			{title: 'Coconut'		, value:'coconut'	  },
			{title: 'Mango'		, value:'mango'	  }
		];
		this.optionsJSX	= this.optionsArr.map( (optionItem) => 
			<option value={optionItem.value}>
				{optionItem.title}
			</option>
		);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('Your favorite flavor is: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite flavor:
					<select 
						/*multiple={true}*/
						//multiple={true}
						value={this.state.value} 
						onChange={this.handleChange}
					>
						{this.optionsJSX}
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(
	<FlavorForm />,
	document.getElementById('forms_example')
);
