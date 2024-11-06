import { EyeIcon, HeartIcon, SearchIcon, } from "lucide-react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import React, { useState } from "react";
export default function BlogPost() {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleLike = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };
    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };
    const fullContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare. Quisque placerat scelerisque tortor ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et. Egestas lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu tellus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum posuere molestie ipsum vel sollicitudin. Nullam non mattis ipsum. Nullam vel tellus scelerisque, varius diam ut, malesuada arcu. Nullam eget tellus risus. Vivamus accumsan pretium ligula, at faucibus felis. Mauris vitae ultricies metus, ut ornare nisi. Phasellus non vulputate nisi. Fusce non rutrum ante. Nam rutrum augue non augue vulputate, non placerat massa consequat. Donec viverra, nulla quis facilisis accumsan, leo orci volutpat sem, ut bibendum magna nisi non lectus.`;
    const truncatedContent = fullContent.slice(0, 200) + "...";
    return (
        <div className="w-full" data-id="element-0">
            <div className="relative h-[300px] mb-16">
                <img src="/news1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8" >
                    <h1 className="text-5xl text-white font-bold">Blog Posts</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <main className="flex-1">
                    <article className="space-y-4">
                        <img
                            src="/news2.png"
                            alt="Healthcare professionals"
                            className="w-full h-[400px] object-cover rounded-lg"
                        />

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <time>Monday 05, September 2021</time>
                            <span>By Author</span>
                            <div className="flex items-center gap-1">
                                <EyeIcon className="w-4 h-4" />
                                <span>68</span>
                            </div>
                            <div
                                className="flex items-center gap-1 cursor-pointer transition-colors duration-200"
                                onClick={toggleLike}
                                role="button"
                                aria-label="Like post"
                            >
                                <HeartIcon
                                    className={`w-4 h-4 ${isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-600 hover:stroke-red-500"} transition-colors duration-200`}
                                />
                                <span className={isLiked ? "text-red-500" : "text-gray-600"}>
                                    {likes}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-navy-900">
                            A passion for putting patients first
                        </h1>

                        <div className="transition-all duration-300 ease-in-out">
                            <p className="text-gray-600 leading-relaxed">
                                {isExpanded ? fullContent : truncatedContent}
                            </p>
                            <button
                                onClick={toggleContent}
                                className="mt-4 flex items-center gap-2 bg-sky-300 hover:bg-sky-400 text-sky-900 rounded-full px-4 py-2 transition-colors duration-200 font-medium"
                            >
                                {isExpanded ? (
                                    <>
                                        Show Less <FaArrowLeftLong className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Read More <FaArrowRightLong className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </article>
                </main>

                <aside className="w-full md:w-80 space-y-6">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full p-2 pl-10 border rounded-lg"
                        />
                        <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    </div>

                    <div className="border rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <img
                                        src={`https://source.unsplash.com/random/100x100?medical=${i}`}
                                        alt=""
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                    <div>
                                        <time className="text-sm text-blue-500">
                                            Monday 05, September 2021
                                        </time>
                                        <h3 className="font-medium">
                                            This Article's Title goes Here, but not too long.
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}