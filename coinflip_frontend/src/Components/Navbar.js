import '../styles/styles.css';
import logo from '../styles/images/fourleaf.png';

const Navbar = () => {
    return(
        <div className='w-100 bg-gl'>
            <div className='mx-w-1100 m-rl-auto pd-10 flex-row'>
                <div className='logo-contar'>
                    <img src={logo} alt="" className='logo-container'/>
                </div>
                <div className='flex-row m-l-auto pd-t-60 pd-20'>
                    <div className='header-font m-rl-2'>
                        Play
                    </div>
                    <div className='header-font m-rl-2'>
                        About
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;