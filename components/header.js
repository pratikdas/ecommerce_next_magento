import Link from "next/link"

const Header = ()=>(
  <>
    <nav className="py-3 navbar navbar-expand-lg fixed-top auto-hiding-navbar">
            <div className="container">
            <a className="navbar-brand" href="#">
                <img  className="logo" src="./assets/logo.png" />XYZ Store
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link href="/"
                    >
                    Home
                    </Link>
                </li>
                <li className="nav-item">
                   <Link href="/categories">Categories</Link>
                </li>
                <li className="nav-item">
                   <Link href="/deals">Login</Link>
                   
                </li>

 
                <li className="nav-item">
                   <Link href="/">Cart</Link>
                </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </div>
    </nav>
  </>
)

export default Header