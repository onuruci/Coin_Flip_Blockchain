import '../styles/styles.css';
import logo from '../styles/images/fourleaf.png';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div className='w-100 bg-gl'>
            <div className='mx-w-1100 m-rl-auto pd-10 flex-row'>
                <Link to="/" className='link-text'>
                    <div className='logo-contar'>
                        <img src={logo} alt="" className='logo-container'/>
                    </div>
                </Link>
                <div className='flex-row m-l-auto pd-t-60 pd-20'>
                    <Link to="/" className='link-text'>
                        <div className='header-font m-rl-2'>
                            Play
                        </div>
                    </Link>
                    <Link to="/" className='link-text'>
                        <div className='header-font m-rl-2'>
                            About
                        </div>
                    </Link>
                    <Link to="/admin" className='link-text'>
                        <div className='header-font m-rl-2'>
                            Admin
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;