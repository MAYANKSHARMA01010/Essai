import React from 'react'
import { Link } from 'wouter'

function navbar() {
  return (
    <div>
        <nav className="hidden md:flex space-x-8">
            <Link href="/Home" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Home</Link>
            <Link href="/About" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">About</Link>
            <Link href="/Blog" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Blog</Link>
            <Link href="/FAQ" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">FAQ</Link>
            <Link href="/Collection" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Collections</Link>
            <Link href="/Shop" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Shop</Link>
            <Link href="/Contact" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Contact</Link>
        </nav>
    </div>
  )
}

export default navbar