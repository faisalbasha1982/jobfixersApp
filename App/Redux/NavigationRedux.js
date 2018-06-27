import AppNavigation from '../Navigation/AppNavigation'
import { NavigationActions } from 'react-navigation';

const initialNavState = AppNavigation.router.getStateForAction(NavigationActions.navigate({routeName:'PushForJob'}));
const firstAction = AppNavigation.router.getStateForAction(NavigationActions.navigate({routeName:'PushForJob'}));

export const reducer = (state=initialNavState, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
