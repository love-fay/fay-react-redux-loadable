import React from 'react';
import Reducer from '../../reducer';

// export default () => {
//   return (
//     <div>
//       Home
//     </div>
//   )
// };

export default class App extends React.Component{
  static a = 1;
  render(): React.ReactNode {
    return <div>123<Reducer/></div>
  }
}