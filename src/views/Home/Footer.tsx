import type React from "react";
import logo from "@assets/Frame.png"
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
    return(
        <footer className="bg-primary-background border-t border-slate-700/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                        <img src={logo} alt="company Logo" className="h-11"/>
                        <div>
                        <h4 className="font-bold text-primary-text">C-DAC Archaeological Platform</h4>
                        <p className="text-sm text-slate-400">Centre for Development of Advanced Computing</p>
                        </div>
                    </div>
                    <p className="text-slate-400 mb-4">
                        Empowering collaborative archaeological research through technology and community engagement.
                    </p>
                </div>
                
                <div>
                    <h5 className="font-semibold mb-4 text-primary-text">Platform</h5>
                    <ul className="space-y-2 text-slate-400">
                        <li><NavLink to="/home" className="hover:text-white transition-colors">Home</NavLink></li>
                        <li><NavLink to="/feed" className="hover:text-white transition-colors">Explore</NavLink></li>
                        <li><NavLink to="/upload" className="hover:text-white transition-colors">Upload</NavLink></li>
                        {/* <li><NavLink to="/research-tools" className="hover:text-white transition-colors">Research Tools</NavLink></li> */}
                        {/* <li><NavLink to="/api-access" className="hover:text-white transition-colors">API Access</NavLink></li> */}
                </ul>
                </div>

                {/* <div> */}
                {/* <h5 className="font-semibold mb-4 text-primary-text">Community</h5>
                <ul className="space-y-2 text-slate-400">
                    <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul> */}
                {/* </div> */}
            </div>
            
            <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
                <p>&copy; 2025 Centre for Development of Advanced Computing (C-DAC). All rights reserved.</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer;