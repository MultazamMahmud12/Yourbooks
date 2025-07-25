
import Harrypotter from "../../assets/Harrypotter.jpg"
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row py-16 justify-between items-center gap-12">
    
    <div className="md:w-1/2 w-full">
    <h1 className="md:text-5xl text-2xl font-secondary  text-color-text-ligh mb-5">The Harrypotter Series -1</h1>
    <p className="mb-10 font-secondary text-color-text-ligh">An exclusive book on harry potter series. Combining all the series , all in one </p>
    <button className="btn-primary">Subscribe</button>
    </div>
    <div className="md:w-1/2 w-full flex items-center md-justify-end">
    <img src={Harrypotter} ></img>

    </div> 
    </div>
  )
}

export default Banner
