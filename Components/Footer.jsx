import React from 'react'
import Link from 'next/link';

export default function Footer(){
  return (
    <footer>
    <div className="container">
      <div className="footer-menu">
        <div className="copyright">&copy; 2024
          ICO Express.   @All rights Reserved.
         </div>
         <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Deployer</Link>
          </li>
          <li>
            <Link href="/">ICO</Link>
          </li>
         </ul>
      </div>
    </div>
  </footer>
  );
}

