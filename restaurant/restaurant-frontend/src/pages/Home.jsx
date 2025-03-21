import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Home() {
    return (
        <div className="bg-black text-white min-h-screen font-[Josefin Sans]">

            {/* 🚀 Hero Section with Background */}
            <section
                className="relative flex flex-col items-center  justify-center text-center h-[70vh] px-6 
                bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('/images/10.webp')",
                }}
            >
                {/* 🔹 Hero Content */}
                <div className="relative z-10 ">
                    <h1 className="text-5xl md:text-7xl  mb-8 font-bold text-yellow-400 font-[Dancing Script]">
                        Royal Bites
                    </h1>
                    <p className="text-lg md:text-3xl text-green-600 mt-3 font-light max-w-2xl">
                        A Fine Dining Experience Crafted with Passion.
                    </p>

                    {/* 🔥 Buttons */}
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <Link
                            to="/menu"
                            className="px-6 py-3 text-lg font-medium rounded-lg bg-yellow-500 text-black 
                          hover:bg-yellow-600 transition">
                            Explore Menu
                        </Link>
                        <Link
                            to="/contact"
                            className="px-6 py-3 text-lg font-medium rounded-lg bg-gray-800 text-white 
                          hover:bg-gray-700 transition">
                            Book a Table
                        </Link>
                    </div>
                </div>
            </section>

            {/* 🔹 Image Grid (4 Images) */}



            {/* ⭐ Feature Highlights */}
            <section className="py-16 text-center">
                <h2 className="text-5xl font-extrabold text-cyan-400 mb-6 font-[Dancing Script]">
                    ⭐ Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {[
                        { title: "👨‍🍳 Master Chefs", desc: "Award-winning chefs crafting exceptional dishes." },
                        { title: "🌿 Fresh Ingredients", desc: "We use only the finest organic ingredients." },
                        { title: "🏆 Award Winning", desc: "Recognized as the best fine dining restaurant." }
                    ].map((feature, index) => (
                        <div key={index} className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                            <h3 className="text-3xl font-bold text-yellow-300">{feature.title}</h3>
                            <p className="text-gray-400 mt-2">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ❤️ Customer Testimonials */}
            <section className="py-16 bg-gray-900">
                <h2 className="text-5xl font-extrabold text-blue-600 text-center mb-6 font-[Dancing Script]">
                    ❤️ What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {[
                        { quote: "The food was absolutely delicious! Best dining experience ever!", name: "- Emily R." },
                        { quote: "Amazing ambiance and top-notch service. Highly recommended!", name: "- John D." },
                        { quote: "A must-visit restaurant for gourmet lovers!", name: "- Sarah K." }
                    ].map((review, index) => (
                        <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <p className="text-gray-300">"{review.quote}"</p>
                            <h4 className="mt-4 text-yellow-300 font-bold">{review.name}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🍜 Featured Menu Section */}
            <section className="py-16">
                <h2 className="text-5xl font-extrabold text-green-400 text-center mb-6 font-[Dancing Script]">
                    🍜 Explore Our Menu
                </h2>
                <Menu />
                <div className="text-center mt-6">
                    <Link to="/menu" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600 transition-all shadow-lg text-xl">
                        View Full Menu
                    </Link>
                </div>
            </section>



        </div>
    );
}

export default Home;
