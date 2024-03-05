import React from 'react'
import TopNav from './TopNav'
import MiddleNav from './MiddleNav'
import BottomNav from './BottomNav'
import StickyBottomnav from './StickyBottomnav'

export default function Header() {
    return (
        <>
            <TopNav />
            <MiddleNav/>
            <BottomNav/>
            <StickyBottomnav/>
        </>
    )
}
