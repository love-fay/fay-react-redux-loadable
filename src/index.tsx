import React from 'react';
import {render} from 'react-dom';
import Provider from './lib/provider';
import Root from './root';

document.title = 'Fay React lib test';

render(<Provider><Root/></Provider>, document.getElementById('app'));