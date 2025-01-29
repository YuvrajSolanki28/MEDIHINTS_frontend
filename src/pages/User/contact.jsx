import { PhoneIcon, MapPinIcon, MailIcon, ClockIcon } from "lucide-react";
import React from "react";
export default function ContactPage() {
    return (
        <div className="w-full" data-id="element-0">
            <div className="relative h-[300px] mb-16">
                <img src="/contact1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8" >
                    <h1 className="text-5xl text-white font-bold">Our Contact</h1>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" data-id="element-8">
                <div className="grid gap-8 lg:grid-cols-2" data-id="element-9">
                    <div data-id="element-10">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-500" data-id="element-11">
                            GET IN TOUCH
                        </h2>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900" data-id="element-12">Contact</h3>

                        <form className="mt-8 space-y-6 bg-[#1e2756] rounded-md px-4 py-4" data-id="element-13">
                            <div className="grid gap-4 sm:grid-cols-2 " data-id="element-14">
                                <input type="text" placeholder="Name" className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm" data-id="element-15" />
                                <input type="email" placeholder="Email" className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm" data-id="element-16" />
                            </div>
                            <input type="text" placeholder="Subject" className="block w-full rounded-md border bg-[#1e2756] border-gray-300 px-4 py-3 text-white shadow-sm" data-id="element-17" />
                            <textarea placeholder="Message" rows={4} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-44"></textarea>
                            <button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-200" data-id="element-45">
                                SUBMIT
                            </button>
                        </form>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2" data-id="element-20">
                        <div className="rounded-lg bg-blue-100 p-8" data-id="element-21">
                            <PhoneIcon className="h-8 w-8 text-blue-900" data-id="element-22" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-900" data-id="element-23">
                                EMERGENCY
                            </h3>
                            <div className="mt-2 space-y-1" data-id="element-24">
                                <p data-id="element-25">(237) 681-812-255</p>
                                <p data-id="element-26">(237) 666-331-894</p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-900 p-8 text-white" data-id="element-27">
                            <MapPinIcon className="h-8 w-8" data-id="element-28" />
                            <h3 className="mt-4 text-xl font-semibold" data-id="element-29">LOCATION</h3>
                            <div className="mt-2 space-y-1" data-id="element-30">
                                <p data-id="element-31">0123 Some place</p>
                                <p data-id="element-32">9876 Some country</p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-8" data-id="element-33">
                            <MailIcon className="h-8 w-8 text-blue-900" data-id="element-34" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-900" data-id="element-35">
                                EMAIL
                            </h3>
                            <div className="mt-2 space-y-1" data-id="element-36">
                                <p data-id="element-37">fildineeesoe@gmil.com</p>
                                <p data-id="element-38">myebstudios@gmail.com</p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-8" data-id="element-39">
                            <ClockIcon className="h-8 w-8 text-blue-900" data-id="element-40" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-900" data-id="element-41">
                                WORKING HOURS
                            </h3>
                            <div className="mt-2 space-y-1" data-id="element-42">
                                <p data-id="element-43">Mon-Sat 09:00-20:00</p>
                                <p data-id="element-44">Sunday Emergency only</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
