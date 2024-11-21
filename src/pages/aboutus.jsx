import { StarIcon, HeartIcon, AwardIcon } from "lucide-react";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
export default function AboutUs() {
  const quotes = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.",
      author: "John Doe",
    },
    {
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      author: "Jane Smith",
    },
    {
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
      author: "Mike Johnson",
    },
  ];
 
  return (
    <div className="w-full">
      <div className="relative h-[300px] mb-16">
        <img src="/aboutus1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8" >
          <h1 className="text-5xl text-white font-bold">About us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img src="/aboutus2.png" alt="Medical professionals" className="rounded-lg w-full" />
          <div data-id="element-12">
            <span className="text-blue-600 font-medium">
              WELCOME TO HOSPITAL NAME
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-8 text-gray-900">
              Best Care for Your Good Health
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-blue-600" />
                <span>A Passion for Healing</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-blue-600" />
                <span>5-Star Care</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-blue-600" />
                <span>All our best</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-blue-600" />
                <span>Believe in Us</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-blue-600" />
                <span>Always Caring</span>
              </div>
              <div className="flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-blue-600" />
                <span>A Legacy of Excellence</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque tortor ornare ornare. Quisque placerat
              scelerisque tortor ornare ornare Convallis felis vitae tortor
              augue. Velit nascetur proin massa in. Consequat faucibus porttitor
              enim et.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque. Convallis felis vitae tortor augue. Velit
              nascetur proin massa in.
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full min-h-[600px] relative flex items-center justify-center px-4 py-20"
        data-id="element-0"
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              "url('/aboutus3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div
          className="max-w-3xl mx-auto text-center relative z-10 w-full "
          data-id="element-1"
        >
          <Carousel showArrows={true} autoPlay interval={3000} infiniteLoop={true} showStatus={false}>
            {quotes.map((ele, ind) => (
              <div className="w-full h-full flex flex-col items-center text-center" key={ind}>
                <div className="relative mb-8">
                  <span
                    className="text-6xl text-white opacity-20 absolute -top-8 left-1/2 transform -translate-x-1/2"
                  >
                    "
                  </span>
                  <p className="text-white text-lg md:text-2xl leading-relaxed px-4 md:px-12">
                    {ele.text}
                  </p>
                </div>
                <div className="mb-12">
                  <h3 className="text-white text-xl font-medium">{ele.author}</h3>
                </div>
              </div>
            ))}
          </Carousel>
          
        </div>
      </div>
    </div>
  );
}
