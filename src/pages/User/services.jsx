import {
    Activity,
    Heart,
    Thermometer,
    Watch,
    Battery,
    Download,
    AlertCircle,
    CheckCircle2,
    XCircle,
    BarChart3,
  } from "lucide-react";
  import React from "react";
  import { render } from "react-dom";
  export default function HealthMonitoringSystem() {
    return (
      <main className="min-h-screen p-6 bg-gray-50">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Health Monitoring Dashboard</h1>
          <p className="text-gray-600">Welcome back, Sarah</p>
        </header>
  
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
              <div>
                <p className="text-gray-600">Heart Rate</p>
                <p className="text-2xl font-bold">72 BPM</p>
              </div>
            </div>
            <button className="mt-auto w-full py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 border rounded-md transition-colors">
              View Details
            </button>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Activity className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-600">Blood Pressure</p>
                <p className="text-2xl font-bold">120/80</p>
              </div>
            </div>
            <button className="mt-auto w-full py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 border rounded-md transition-colors">
              View Details
            </button>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Thermometer className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-gray-600">Temperature</p>
                <p className="text-2xl font-bold">98.6°F</p>
              </div>
            </div>
            <button className="mt-auto w-full py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 border rounded-md transition-colors">
              View Details
            </button>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <BarChart3 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-600">Blood Sugar</p>
                <p className="text-2xl font-bold">95 mg/dL</p>
              </div>
            </div>
            <button className="mt-auto w-full py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 border rounded-md transition-colors">
              View Details
            </button>
          </div>
        </section>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  time: "Today 8:30 AM",
                  event: "High heart rate detected",
                  type: "warning",
                  value: "110 BPM",
                },
                {
                  time: "Today 7:15 AM",
                  event: "Blood pressure measurement",
                  type: "success",
                  value: "118/79",
                },
                {
                  time: "Yesterday 9:45 PM",
                  event: "Temperature check",
                  type: "normal",
                  value: "98.4°F",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center gap-3">
                    {activity.type === "warning" && (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                    {activity.type === "success" && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {activity.type === "normal" && (
                      <Activity className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{activity.event}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className="font-medium">{activity.value}</span>
                </div>
              ))}
            </div>
          </section>
  
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Smart Watch",
                  status: "Connected",
                  battery: "85%",
                  icon: Watch,
                },
                {
                  name: "Blood Pressure Monitor",
                  status: "Disconnected",
                  battery: "20%",
                  icon: Activity,
                },
                {
                  name: "Temperature Sensor",
                  status: "Connected",
                  battery: "90%",
                  icon: Thermometer,
                },
              ].map((device, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center gap-3">
                    <device.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <div className="flex items-center gap-2">
                        {device.status === "Connected" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-gray-500">
                          {device.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{device.battery}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
  
        <section className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Health Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Monthly Health Summary",
                date: "July 2023",
                size: "2.4 MB",
              },
              {
                title: "Blood Pressure Analysis",
                date: "Last 3 months",
                size: "1.8 MB",
              },
              {
                title: "Heart Rate Variability",
                date: "Last week",
                size: "956 KB",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="p-4 border rounded flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{report.title}</p>
                  <p className="text-sm text-gray-500">{report.date}</p>
                  <p className="text-xs text-gray-400">{report.size}</p>
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={`Download ${report.title}`}
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
  render(<HealthMonitoringSystem />, document.getElementById("root"));