import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import NewPassword from './components/NewPassword';
import Payment from './components/Payment';
import InternationalPayment from './components/InternationalPayment';
import PaymentEmandate900 from './components/PaymentEmandate900';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/forgot-password' exact component={ForgotPassword} />
                <Route path='/payment' exact component={Payment} />
                <Route path='/new-password' component={NewPassword} />
                <Route path='/int-payment' component={InternationalPayment} />
                <Route path='/login' exact component={Login} />
                <Route path='/payment-emandate-900' exact component={PaymentEmandate900} />
                <Route path='/' render={() => <Redirect to='/login' />} />
            </Switch>
        </Router>
    );
}

export default App;
