/**
 * Created by feichongzheng on 17/10/13.
 */
import Loadable from '../lib/loadable';

export default Loadable({
  view: () => import(/* webpackChunkName: "Reducer" */'./views'),
  reducer: () => import(/* webpackChunkName: "Reducer" */'./reducer'),
});
