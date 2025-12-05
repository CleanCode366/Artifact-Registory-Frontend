import { Upload } from "lucide-react"
import { NavLink } from "react-router-dom";


const HeroSection = () => {
    return (
        <section className="relative overflow-hidden" style={{ borderRadius: "30px", minHeight: "500px", background: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%,rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.9) 100%), url(})` }}>
            <div className="w-full h-full" style={{ minHeight: "inherit", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="text-center mb-12">
]                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary-text">
                        Decode Ancient Wisdom Together
                    </h2>
                    <p className="text-xl text-primary-text/60 max-w-3xl mx-auto mb-8">
                        Join the C-DAC's collaborative platform for archaeological inscriptions.
                        Discover, transcribe, translate, and preserve humanity's written heritage.
                    </p>

                    {/* Search Bar */}
                    {/* <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search inscriptions, locations, or time periods..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                    />
                    </div>
                </div> */}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center text-primary-text">
                        <NavLink to="/upload" className="bg-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                            <Upload className="inline mr-2 w-5 h-5" />
                            Upload Inscription
                        </NavLink>
                        <NavLink to="/feed" className="bg-slate-800/50 border border-slate-600 hover:bg-slate-700/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm">
                            Explore Collection
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;