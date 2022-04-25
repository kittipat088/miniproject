import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#"> Car Shop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/editCars">Cars Lists</a>
      </li>
    </ul>
  </div>
  <div class="navbar navbar-dark bg-dark justify-content-between">
  <ul class="navbar-nav">      
      <li class="nav-item active">
        <a class="nav-link" href="/register">Register<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/login">Login<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/logout">Logout<span class="sr-only">(current)</span></a>
      </li>      
    </ul>
</div>
</nav>


)

export default Navbar


    /*<div className={styles.navcontainer}>
    <nav className={styles.navbar}>
        <h1  className={styles.navbarlogo}>Cars Information</h1>
        <ul className={styles.navmenu}>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/getConfig"><a> Config </a></Link> |       
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/editCars"><a> Cars </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
        </ul>        
    </nav>
    </div>*/