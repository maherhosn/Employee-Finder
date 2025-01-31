import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  return (

      <nav>
          <Link
            to='/'
            className={
              currentPage === '/' ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </Link>
          <Link
            to='/SavedCandidates'
            className={
              currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'
            } 
          >
            Potential Candidates
          </Link>
      </nav>

  )
};

export default Nav;
