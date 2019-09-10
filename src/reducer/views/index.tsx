import React from 'react';
import {connect} from 'react-redux';
import {onAction} from '../actions';
import reducerName from '../reducerName';

const mapStateToProps = (state: any) => {
  return {
    state: state[reducerName] || {type: 1}
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    action: () => dispatch(onAction({a: 1}))
  }
};

// export default connect(mapStateToProps, mapDispatchToProps)((props: any) => {
//   return (
//     <div>
//       Reducer:{props.state.type}
//       <button onClick={props.action}>action</button>
//     </div>
//   )
// });

class App extends React.Component{

  static a = 1;
  render(){
    return (
      <div>
        Reducer:{this.props.state.type}
        <button onClick={this.props.action}>action</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);