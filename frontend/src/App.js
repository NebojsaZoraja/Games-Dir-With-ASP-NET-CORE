import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OverviewScreen from './screens/OverviewScreen';
import EmptyCartScreen from './screens/EmptyCartScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import GameListScreen from './screens/GameListScreen';
import GameEditScreen from './screens/GameEditScreen';
import AllGamesScreen from './screens/AllGamesScreen';
import ScrollToTop from './components/ScrollToTop';
import GameSearch from './screens/GameSearch';
import GenresListScreen from './screens/GenresListScreen';
import GenreEditScreen from './screens/GenreEditScreen';
import NotFoundScreen from './screens/NotFoundScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container bg="dark">
          <ScrollToTop>
            <Switch>
              {/* <Route path="/search/:keyword" component={HomeScreen} exact /> */}
              <Route path="/games/search/:keyword" component={GameSearch} />
              <Route path="/games" component={AllGamesScreen} />
              <Route path="/game/:id" component={GameScreen} />
              <Route path="/overview/:id" component={OverviewScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/payment/:id" component={PaymentScreen} />
              <Route path="/placeorder/:id" component={PlaceOrderScreen} />
              <Route path="/empty" component={EmptyCartScreen} />
              <Route path="/profile/:pageNumber" component={ProfileScreen} exact />
              <Route path="/profile" component={ProfileScreen} exact />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/admin/game/:id/edit" component={GameEditScreen} />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route path="/admin/gamelist/:pageNumber" component={GameListScreen} exact />
              <Route path="/admin/gamelist" component={GameListScreen} exact />
              <Route path="/admin/userlist" component={UserListScreen} exact />
              <Route path="/admin/genreslist" component={GenresListScreen} exact />
              <Route path="/admin/genreslist/:id/edit" component={GenreEditScreen} />
              <Route path="/admin/userlist/:pageNumber" component={UserListScreen} exact />
              <Route path="/" component={HomeScreen} exact />
              <Route path="/not-found" component={NotFoundScreen} exact />
              <Redirect to="/not-found" />
            </Switch>
          </ScrollToTop>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
