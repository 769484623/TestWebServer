import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Toast extends Component {
    static Counter = 0;
    constructor(props) {
        super(props);
        this.state = {
            yCoordinate: props.yCoordinate,
            dialogString: props.dialogString,
            timeout: props.timeout
        };
        const topPercent = ((this.state.yCoordinate > 1 ? 0 : this.state.yCoordinate) * 100).toString() + '%';
        this.toast = this.toast.bind(this);
        this.componentDismiss = this.componentDismiss.bind(this);
        this.toastStyle =
            {
                'textAlign': 'center',
                'position': 'fixed',
                'backgroundColor': 'white',
                'top': topPercent,
                'left': '0px',
                'right': '0px',
                'width': '40%',
                'height': '20%',
                'margin': 'auto'
            };
    }

    render() {
        return (
            <div style={this.toastStyle}>
                {this.state.dialogString}
            </div>
        );
    }

    toast() {
        if(Toast.Counter === 0)
        {
            Toast.Counter++;
            ReactDOM.render(<Toast {...this.state}/>, document.getElementById('toast'));
            this.timer = setInterval(this.componentDismiss, this.state.timeout);
        }
    }

    componentDismiss() {
        const parent = document.getElementById('toast');
        ReactDOM.unmountComponentAtNode(parent);
        clearInterval(this.timer);
        Toast.Counter--;
    }
};
Toast.propTypes = {
    yCoordinate: PropTypes.number,
    dialogString: PropTypes.string,
    timeout: PropTypes.number
};

Toast.defaultProps = {
    yCoordinate: 0.5,
    dialogString: 'Default String',
    timeout: 3000
};