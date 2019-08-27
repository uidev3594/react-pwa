import React, { Component } from 'react';
import './App.css';
import {Layout, Header, Content, Navigation, Drawer} from 'react-mdl';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewsContent from './news-content';

class App extends Component {
 render() {
    return (
      <div className="App">
        <Router>
          <Layout fixedHeader>
            <Header title="Live News">
              <Navigation className="hide-on-sm">
                 <select id="sources"></select>
              </Navigation>
            </Header>
            <Content>
              <Route exact path="/" component={NewsContent} />
            </Content>
          </Layout>
        </Router>
      </div>
    );
 }
}

export default App;
