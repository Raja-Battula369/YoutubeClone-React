
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Feed from "./components/Feed";

import Header from "./components/Header"; 
import SearchResults from "./components/SearchResults";
import VideoDetails from "./components/VideoDetails";



function App() {



  return (
  
    <Router>
      <Header />
            <Routes>
              <Route path="/" element={<Feed/>} />
              <Route path="/searchResult/:searchQuery" element={<SearchResults/>} />
              <Route path="/video/:id" element={<VideoDetails/>} />

            </Routes>
    </Router>
  
)};

export default App;
