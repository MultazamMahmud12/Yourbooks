
import Harrypotter from "../../assets/Harrypotter.jpg"
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row py-16 justify-between items-center gap-12">
    
    <div className="md:w-1/2 w-full">
    <h1 className="md:text-5xl text-2xl font-secondary  text-color-text-ligh mb-5">YourBook.com</h1>
    <p className="mb-10 font-secondary text-color-text-ligh">Subscribe to our package . Get daily notifications about new books and offers. </p>
    <button 
  className="px-6 py-3 rounded-lg font-semibold font-secondary transition-all duration-200 hover:opacity-90"
  style={{ 
    backgroundColor: 'var(--color-secondary)',
    color: 'white'
  }}
>
  Subscribe
</button>
    </div>
    <div className="md:w-1/2 w-full flex items-center md-justify-end">
    <img src={Harrypotter} ></img>

    </div> 
    </div>
  )
}

export default Banner
