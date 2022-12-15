import Announcement from "../common/Announcement";
import Categories from "../common/Categories";
import Footer from "../common/Footer";
import Newsletter from "../common/Newsletter";
import Slider from "../common/Slider";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
