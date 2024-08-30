import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div >
      

<section class="bg-center bg-no-repeat bg-[url('https://plus.unsplash.com/premium_photo-1712737938807-ecc2650279fa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply" >
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
    <h1 class="mb-4 text-4xl font-comic tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to Crime Reporting and Community Safety App</h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <Link to="/register/individual">
            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900
            mx-4">
                Register as Individual
            </a>
            </Link>
            <Link to="/login/individual">
            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900
            mx-4">
                Login as Individual
            </a>
            </Link>
            <Link to="/login/official">
            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900
            mx-4">
               Login as Official
            </a>
            </Link>
        </div>
    </div>
</section>

</div>
  );
};

export default Home;