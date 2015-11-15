const React = require('react');
const { render } = require('react-dom');

// material-ui
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');

const injectTapEventPlugin = require('react-tap-event-plugin');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


require('./main.scss');

const initialState = {
    muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    currentIndex : 0
}

class SwipePane extends React.Component{
	
    componentWillMount(){
        console.log("componentWillMount");
    }

    componentDidMount(){

        const {updateIndex, paneIndex} = this.props;
        console.log("componentDidMount");
        
        $( ".pane" ).hammer().on( "swiperight", swipeRightHandler );
        $( ".pane" ).hammer().on( "swipeleft", swipeLeftHandler );
        $( ".pane" ).hammer().on( "tap", tapHandler );

        function swipeRightHandler( event ){       
            $(this).animate({
                right: '-3000px',
             }, 200, function(){
                //$(this).addClass('hidden');
                updateIndex(1);
                $(this).css("right", "0");
             });
        }

        function swipeLeftHandler( event ){
            $(this).animate({
                left: '-3000px'
             }, 200, function(){
                //$(this).addClass('hidden');
                updateIndex(1);
                $(this).css("left", "0");
             });
        }

        function tapHandler(){
            console.log("tapped!");
        }
    }
    render(){
		const {paneContent, paneIndex} = this.props;
		return(
			<div className='pane'  id = { paneIndex }>
				{paneIndex}
			</div>
		);
	}
}

class SwipeBody extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= initialState;
    }

    getChildContext() {
        return {
          muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {

        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });

        this.setState({muiTheme: newMuiTheme});
    }

    renderSwipePane(content, index){
    	return(
    		<SwipePane key={index} 
    			paneContent={content.content} 
    			paneIndex={index} />
    	);
    }

    renderSingleSwipePane(content){
        
        //console.log("!!!!");
        console.log("currentIndex: " + this.state.currentIndex);
        //console.log(this.state.currentIndex);
        
        return(
            <SwipePane 
                paneContent={this.state.currentIndex} 
                paneIndex={this.state.currentIndex} 
                updateIndex = {this.updateIndex.bind(this)} />
        );
    }

    updateIndex(indexUpdate){
        let index = this.state.currentIndex + indexUpdate;
        this.setState({currentIndex: index});
    }

    render() {
    	const contents = this.state.contents;
        //console.log("XDD");
        //console.log(this.state.currentIndex);
        return (
            <div>
                <div style={{}}>
                    <AppBar
                      title="Swipo"
                      iconClassNameRight="muidocs-icon-navigation-expand-more" /> 
                </div>
            	<div> 
            		{this.renderSingleSwipePane()}
            	</div>
            </div>
        );
    }
}

SwipeBody.childContextTypes = {
    muiTheme: React.PropTypes.object,
}


render(<SwipeBody />, document.getElementById('root'));