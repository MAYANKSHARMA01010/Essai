import React from 'react'
import { Link } from 'wouter'

function navbar() {
  return (
    <div>
        <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Home</Link>
            <Link href="/About" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">About</Link>
            <Link href="/Blog" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Blog</Link>
            <Link href="/collection" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Collections</Link>
            <Link href="/shop" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Shop</Link>
            <Link href="/contact" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">Contact</Link>
        </nav>
    </div>
  )
}

export default navbar