# fay react redux loadable

# Usage
`npm i @fay-react/react-redux-loadable`

```javascript
import React from 'react';
import {render} from 'react-dom';
import {Provider}  from '@fay-react/react-redux-loadable';

//all props exclude children are not required
render(
  <Provider
    initReducer={}//init reducer
    reduxMiddlewares={[]}// redux middlewares,eg:import { routerMiddleware } from 'connected-react-router'
    loadingBoundary={<div>loading...</div>}// show loading component when loading js files
    errorBoundary={({children}) => <div>...</div>}//show error
  >
    //...
    //{children}
  </Provider>,
  document.getElementById('app')
);
```

```javascript
import {Loadable, Provider}  from '@fay-react/react-redux-loadable';

export default Loadable({
  /*required*/
  view: import(/* webpackChunkName: "test" */'./views'),
  /*not required*/
  reducer: import(/* webpackChunkName: "test" */'./reducer'),
  /*not required*/
  sagas: import(/* webpackChunkName: "test" */'./sagas'),
});
```
