import { ChevronRight, MapPin, Star, TrendingUp } from "lucide-react"
import { NavLink } from "react-router-dom";

const ReactActivity = () => {
    const recentDiscoveries = [
        { title: "Kushana Era Inscription", location: "Mathura, UP", contributor: "Dr. Priya Sharma", date: "2 days ago" },
        { title: "Chalukya Temple Inscription", location: "Badami, Karnataka", contributor: "Prof. Rajesh Kumar", date: "1 week ago" },
        { title: "Mughal Garden Marker", location: "Srinagar, J&K", contributor: "Sarah Ahmed", date: "2 weeks ago" },
        { title: "Maratha Victory Stone", location: "Pune, Maharashtra", contributor: "Vikram Patil", date: "3 weeks ago" }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Recent Discoveries */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-secondary-dark">Recent Discoveries</h3>
                            <NavLink to="/feed" className="text-orange-500 hover:text-orange-400 text-sm font-medium outline-none focus:outline-none cursor-pointer flex items-center">
                                View All <ChevronRight className="text-orange-500 hover:text-orange-400 text-sm font-medium outline-none focus:outline-none cursor-pointer w-4 h-4 ml-1" />
                            </NavLink>
                        </div>

                        <div className="space-y-4">
                            {recentDiscoveries.map((discovery, index) => (
                                <div key={index} className="card-styling border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-colors cursor-pointer backdrop-blur-sm text-primary-text/90">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2" style={{ color: "black" }}>{discovery.title}</h4>
                                            <div className="flex items-center text-slate-400 text-sm mb-1" style={{ color: "black" }}>
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {discovery.location}
                                            </div>
                                            <p className="text-slate-400 text-sm" style={{ color: "black" }}>Contributed by {discovery.contributor}</p>
                                        </div>
                                        <div className="text-slate-500 text-sm">{discovery.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Community Highlights */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-primary-text" style={{ color: "black" }}>Community Highlights</h3>

                        <div className="card-styling bg-primary-text rounded-xl p-6 mb-6 border border-slate-700/50 backdrop-blur-sm">
                            <div className="flex items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 mr-2" style={{ color: "black" }} />
                                <h4 className="font-semibold">Top Contributor</h4>
                            </div>
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold">
                                    DR
                                </div>
                                <div>
                                    <p className="font-medium">Dr. Rajesh Mehta</p>
                                    <p className="text-sm text-slate-400" style={{ color: "black" }}>89 contributions this month</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300" style={{ color: "black" }}>
                                "Specializing in Gupta period inscriptions with expertise in ancient Brahmi script."
                            </p>
                        </div>

                        <div className="card-styling border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm text-primary-text" style={{ color: "black" }}>
                            <div className="flex items-center mb-4">
                                <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                                <h4 className="font-semibold">Trending This Week</h4>
                            </div>
                            <div className="space-y-3 text-primary-text/80" style={{ color: "black" }}>
                                <div className="flex justify-between">
                                    <span className="text-sm">Chola Inscriptions</span>
                                    <span className="text-green-400 text-sm" style={{ color: "#05DF72", fontWeight: "bold" }}>+24%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Mauryan Scripts</span>
                                    <span className="text-green-400 text-sm" style={{ color: "#05DF72", fontWeight: "bold" }}>+18%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Rock Edicts</span>
                                    <span className="text-green-400 text-sm" style={{ color: "#05DF72", fontWeight: "bold" }}>+15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReactActivity;