import React,{Component} from 'react';
import PropTypes from 'prop-types'
export default class PlaceHolder extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            elementHeight:0
        };
        this.otherElementHeight=this.props.otherElementHeight;
        this.onWindowsResize = this.onWindowsResize.bind(this);
    }
    onWindowsResize(){
        let height = 70;
        if(window.innerHeight > this.otherElementHeight + 100)
        {
            height += window.innerHeight - this.otherElementHeight - 100;
        }
        this.setState({elementHeight:height});
    }
    componentDidMount(){
        this.onWindowsResize();
        window.addEventListener('resize',this.onWindowsResize);
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.onWindowsResize);
    }
    render() {
        const style = {
            'height':this.state.elementHeight
        };
        return (
            <div style={style} />
        );
    }
}
PlaceHolder.defaultProps = {
    otherElementHeight:400,
    defaultHeight:100
};
PlaceHolder.propTypes = {
    otherElementHeight:PropTypes.number.isRequired,
    defaultHeight:PropTypes.number
}
;