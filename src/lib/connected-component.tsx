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

const unConnectedComponent = (
  <LoadableContext.Consumer>
    {
      ({loadingBoundary}) => loadingBoundary
    }
  </LoadableContext.Consumer>
);

export default ({reducer, saga, view, viewProps}:any) => {
  const [component, setComponent] = React.useState(unConnectedComponent);

  React.useEffect(() => {
    const promises = [view];
    reducer && promises.push(reducer);
    saga && promises.push(saga);
    Promise.all(promises).then((values) => {
      const [_view, _reducer, _saga] = values;
      setComponent(connectedComponent({view: _view.default, reducer: _reducer && _reducer.default, saga: _saga && _saga.default, viewProps}));
    });
  }, [true]);

  return component;
}

