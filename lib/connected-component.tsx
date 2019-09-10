import React from 'react';
import {ReactReduxContext} from "react-redux";
import LoadableContext from './loadableContext';
import {injectAsyncStore} from "./store";

const connectedComponent = ({view, reducer, saga, viewProps}: any) => {
  const View = view;
  return (
    <LoadableContext.Consumer>
      {
        ({errorBoundary}) => {
          const ErrorBoundary = errorBoundary;
          return (
            <ErrorBoundary>
              <ReactReduxContext.Consumer>
                {({ store }) => {
                  injectAsyncStore(store, reducer, saga);
                  return <View {...viewProps}/>
                }}
              </ReactReduxContext.Consumer>
            </ErrorBoundary>
          )
        }
      }
    </LoadableContext.Consumer>

  )
};

const unConnectedComponent = () => (
  <LoadableContext.Consumer>
    {
      ({loadingBoundary}) => loadingBoundary
    }
  </LoadableContext.Consumer>
);

// export default ({reducer, saga, view, viewProps}:any) => {
//   // const [component, setComponent] = React.useState(unConnectedComponent);
//   const [state, setState]:any = React.useState({});
//   let a = 1;
//   console.log(a);
//   React.useEffect(() => {
//     const promises = [view];
//     reducer && promises.push(reducer);
//     saga && promises.push(saga);
//     Promise.all(promises).then((values) => {
//       const [_view, _reducer, _saga] = values;
//       a = 2;
//       setState({view: _view.default, reducer: _reducer && _reducer.default, saga: _saga && _saga.default, viewProps});
//       // setComponent();
//     });
//   }, [true]);
//   console.log(a);
//   const Com = state.view ? connectedComponent : unConnectedComponent;
//   return <Com {...state}/>;
// }

export default class ReactReduxConnectedComponent extends React.Component<any, any>{
  private mount: boolean;
  constructor(props:any) {
    super(props);
    this.state = {
      component: unConnectedComponent()
    };
    this.mount = false;
  }

  componentDidMount(): void {
    this.mount = true;
    this.loadCom(this.props);
  }

  loadCom = (props: any) => {
    const {reducer, saga, view, viewProps} = props;
    const promises = [view()];
    reducer && promises.push(reducer());
    saga && promises.push(saga());
    Promise.all(promises).then((values) => {
      const [_view, _reducer, _saga] = values;
      this.mount && this.setState({component: connectedComponent({view: _view.default, reducer: _reducer && _reducer.default, saga: _saga && _saga.default, viewProps})});
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<any>): void {
    this.loadCom(nextProps);
  }

  componentWillUnmount(): void {
    this.mount = false;
  }

  render(){
    return this.state.component;
  }

}
