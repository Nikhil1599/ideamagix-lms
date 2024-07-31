import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
