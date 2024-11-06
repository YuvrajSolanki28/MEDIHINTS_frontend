import { PhoneIcon } from "lucide-react";
import React from "react";
export default function AppointmentBooking() {
    return (
        <div className="w-full" data-id="element-0">
            <div className="relative h-[300px] mb-16">
                <img src="/appointment1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8" >
                    <h1 className="text-5xl text-white font-serif font-bold">Boock Appointment</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Book an Appointment
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                        placerat scelerisque tortor ornare ornare. Convallis felis vitae
                        tortor augue. Velit nascetur proin massa in. Consequat faucibus
                        porttitor enim et.
                    </p>

                    <form className="space-y-4 bg-[#1e2756] rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div data-id="element-7">
                                <input type="text" placeholder="Name" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required data-id="element-8" />
                            </div>
                            <div data-id="element-9">
                                <select className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-10">
                                    <option value="" data-id="element-11">Gender</option>
                                    <option value="male" data-id="element-12">Male</option>
                                    <option value="female" data-id="element-13">Female</option>
                                    <option value="other" data-id="element-14">Other</option>
                                </select>
                            </div>
                            <div data-id="element-15">
                                <input type="email" placeholder="Email" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required data-id="element-16" />
                            </div>
                            <div data-id="element-17">
                                <input type="tel" placeholder="Phone" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required data-id="element-18" />
                            </div>
                            <div data-id="element-19">
                                <input type="date" className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" required data-id="element-20" />
                            </div>
                            <div data-id="element-21">
                                <select className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-22">
                                    <option value="" data-id="element-23">Select Time</option>
                                    <option value="09:00" data-id="element-24">09:00 AM</option>
                                    <option value="10:00" data-id="element-25">10:00 AM</option>
                                    <option value="11:00" data-id="element-26">11:00 AM</option>
                                    <option value="14:00" data-id="element-27">02:00 PM</option>
                                    <option value="15:00" data-id="element-28">03:00 PM</option>
                                    <option value="16:00" data-id="element-29">04:00 PM</option>
                                </select>
                            </div>
                            <div data-id="element-30">
                                <select className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-31">
                                    <option value="" data-id="element-32">Select Doctor</option>
                                    <option value="dr-smith" data-id="element-33">Dr. Smith</option>
                                    <option value="dr-jones" data-id="element-34">Dr. Jones</option>
                                    <option value="dr-williams" data-id="element-35">Dr. Williams</option>
                                </select>
                            </div>
                            <div data-id="element-36">
                                <select className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-37">
                                    <option value="" data-id="element-38">Select Department</option>
                                    <option value="cardiology" data-id="element-39">Cardiology</option>
                                    <option value="neurology" data-id="element-40">Neurology</option>
                                    <option value="pediatrics" data-id="element-41">Pediatrics</option>
                                    <option value="orthopedics" data-id="element-42">Orthopedics</option>
                                </select>
                            </div>
                        </div>

                        <div data-id="element-43">
                            <textarea placeholder="Message" rows={4} className="w-full p-3 rounded border text-white border-gray-300 bg-[#1e2756]" data-id="element-44"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-200" data-id="element-45">
                            SUBMIT
                        </button>
                    </form>
                </div>

                <div className="bg-[#1e2875] text-white p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-8">Schedule hours</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Monday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tuesday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Wednesday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thursday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Friday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>—</span>
                            <span>09:00 AM - 07:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>—</span>
                            <span>Closed</span>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-4">
                            <PhoneIcon className="h-8 w-8" />
                            <div>
                                <div className="text-lg font-semibold">Emergency</div>
                                <div className="text-xl">(237) 681-812-255</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}