import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default () => {
    const pageNum = useParams().pageNum * 1;

    return (
        <header>
            <nav>
                {!Number.isNaN(pageNum) && pageNum > 0 ? (
                    <Link className='nav-button unstyled-link prev' to={`/${pageNum - 1}`} name='back-button'>
                        <label htmlFor='back-button'>
                            <ArrowBackIosIcon className='button-icon' />
                        </label>
                    </Link>
                ) : (
                    <div className='nav-button prev'></div>
                )}
                <div>
                    <Link className='unstyled-link' id='home-button' to='/' name='home-button'>
                        <h1>
                            <label htmlFor='home-button'>Living the Program</label>
                        </h1>
                    </Link>
                </div>
                {!Number.isNaN(pageNum) && pageNum < 6 ? (
                    <Link className='nav-button unstyled-link next' to={`/${pageNum + 1}`} name='next-button'>
                        <div className='right-text'>
                            <label htmlFor='next-button'>
                                <ArrowForwardIosIcon className='button-icon' />
                            </label>
                        </div>
                    </Link>
                ) : (
                    <div className='nav-button next'></div>
                )}
            </nav>
        </header>
    );
};
