import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../styling/dashboard.css'

const Dashboard = () => {
  return (
    <div className='main-container'>
      <div className='sub-container'>
        <div className='login-container'> 
            <Header />
        </div>
        <div className='dashboard-container'>
            <h1 className='heading-name'>Dashboard</h1>
            <div className='admin-panel-main-container'>
                <div className='admin-panel-sub-container'>
                    <div className='admin-panel-text-container'>
                        <p className='admin-panel-welcome-text'>Welcome to Admin-panel</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='footer-container'>
            <Footer />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
