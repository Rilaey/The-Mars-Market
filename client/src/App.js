import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import NoPageFound from "./pages/NoPageFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Item from "./pages/Item";
import CreatePost from "./pages/CreatePost";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost";
import MasterPage from './pages/MasterPage'
import './index.css'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <div className="pt-[50px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="*" element={<NoPageFound />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/createpost/:profileId" element={<CreatePost />} />
            <Route path="/editprofile/:profileId" element={<EditProfile />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path={process.env.REACT_APP_MASTER_PAGE} element={<MasterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
