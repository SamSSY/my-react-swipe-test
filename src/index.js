const React = require('react');
const { render } = require('react-dom');
const ReactSwipe = require('react-swipe');

require('./main.scss');

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
	
    componentDidMount(){
   
        $( ".pane" ).on( "swiperight", swipeRightHandler );
        $( ".pane" ).on( "swipeleft", swipeLeftHandler );

        function swipeRightHandler( event ){
            
            $(this).animate({
                right: '-3000px',
             }, 200, function(){
                $(this).addClass('hidden');
             });
        }

        function swipeLeftHandler( event ){
            $(this).animate({
                left: '-3000px'
             }, 200, function(){
                $(this).addClass('hidden');
             });
        }

    }
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
        	<div> 
        		{contents.map(this.renderSwipePane, this)}
        	</div>
        );
    }
}



render(<SwipeBody />, document.getElementById('root'));