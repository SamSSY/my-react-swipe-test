const React = require('react');
const { render } = require('react-dom');
const ReactSwipe = require('react-swipe');

require('./main.css');

const initialState = {
	contents :[ 
		{content: 'one'},
		{content: 'two'},
		{content: 'three'},
		{content: 'four'},
		{content: 'five'},
		{content: 'six'},
		{content: 'seven'},
		{content: 'eight'}
	]
}

class SwipePane extends React.Component{
	render(){
		const {paneContent, paneIndex} = this.props;
		return(
			<div className='pane'  id = { paneContent }>
				{paneContent}
			</div>
		);
	}
}

class SwipeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state= initialState;
    }

    renderSwipePane(content, index){
    	return(
    		<SwipePane key={index} 
    			paneContent={content.content} 
    			paneIndex={index} />
    	);
    }

    render() {
    	const contents = this.state.contents;
        return (  
        	<ReactSwipe>
        		{contents.map(this.renderSwipePane, this)}
        	</ReactSwipe>
        );
    }
}



render(<SwipeBody />, document.getElementById('root'));