import React from 'react';
import './App.css';
import Layout from "./components/layout/Layout";
import {HomeScreen} from "./screens/HomeScreen";

function App() {
  return (
    <div className="App">
      <Layout>
        <HomeScreen />
      </Layout>
    </div>
  );
}

export default App;
