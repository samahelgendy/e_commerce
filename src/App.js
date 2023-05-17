import logo from './logo.svg';
import './App.css';
import PageContent from './Components/PageContent';
import AppHeader from './Components/Header';
import AppFooter from './Components/Footer';

function App() {
  return (
    <div className="App">
      <AppHeader />
     <PageContent />
     <AppFooter />

    </div>
  );
}

export default App;
