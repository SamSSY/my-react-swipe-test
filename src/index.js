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
	contents :[ 
		{content: 'one'},
		{content: 'two'},
		{content: 'three'},
		{content: 'four'},
		{content: 'five'},
		{content: 'six'},
		{content: 'seven'},
		{content: 'eight'}
	],
    muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
}

class SwipePane extends React.Component{
	
    componentDidMount(){
        
        $( ".pane" ).hammer().on( "swiperight", swipeRightHandler );
        $( ".pane" ).hammer().on( "swipeleft", swipeLeftHandler );

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

    getChildContext() {
        return {
          muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {
        //console.log("!!!");

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

    render() {
    	const contents = this.state.contents;
        console.log(this.state.muiTheme);

        return (
            <div>
                <AppBar
                  title="Title"
                  iconClassNameRight="muidocs-icon-navigation-expand-more" /> 
                  <RaisedButton label="Default" />
            	<div> 
            		{contents.map(this.renderSwipePane, this)}
            	</div>
            </div>
        );
    }
}

SwipeBody.childContextTypes = {
    muiTheme: React.PropTypes.object,
}


render(<SwipeBody />, document.getElementById('root'));