const React = require('react');
const { render } = require('react-dom');
const ReactSwipe = require('react-swipe');

const initialState = {
	contents :[ 
		{content: 'aaaa'},
		{content: 'bbbb'},
		{content: 'ccccc'},
		{content: 'ric'},
		{content: 'sam'},
		{content: 'michael'},
		{content: 'ray'},
		{content: 'david'}
	]
}

class SwipePane extends React.Component{
	render(){
		const {paneContent, paneIndex} = this.props;
		return(
			<div>
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