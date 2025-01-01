import {
    Search,
    Plus,
    Trash2,
    Edit2,
    X,
    Database,
    Table,
    Filter,
    Download,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function AdminDashboard() {
    const [activeTable, setActiveTable] = useState("users");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [tables, setTables] = useState({
        users: [],
        Laboratory: [],
        Doctor: [],
        Appointment: []
    });
    const [editedData, setEditedData] = useState({});

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, labResponse, appointmentResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/user'),
                    axios.get('http://localhost:8000/api/laboratory'),
                    axios.get('http://localhost:8000/api/appointment')
                ]);

                setTables((prevTables) => ({
                    ...prevTables,
                    users: usersResponse.data.data.map(user => ({
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        contactNumber: user.contactNumber,
                        address: user.address,
                        birthDate: user.birthDate,
                        gender: user.gender,
                        bloodGroup: user.bloodGroup,
                        token: user.token,
                    })),
                    Laboratory: labResponse.data.data.map(lab => ({
                        id: lab._id,
                        labName: lab.labName,
                        email: lab.email,
                        pincode: lab.pincode,
                        testTypes: lab.testTypes,
                        location: lab.location,
                        contactNumber: lab.contactNumber,
                    })),
                    Appointment: appointmentResponse.data.data.map(appt => ({
                        id: appt._id,
                        fullName: appt.fullName,
                        email: appt.email,
                        contactNumber: appt.contactNumber,
                        birthDate: appt.birthDate,
                        gender: appt.gender,
                        time: appt.time,
                        doctor: appt.doctor,
                        department: appt.department,
                        messageBox: appt.messageBox
                    })),
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        setEditingId(id);
        const record = tables[activeTable].find((item) => item.id === id);
        setEditedData({ ...record });
    };

    const handleSave = async () => {
        if (!editingId) return;

        try {
            const response = await axios.put(
                `http://localhost:8000/api/${activeTable.toLowerCase()}/${editingId}`,
                editedData
            );

            setTables((prevTables) => ({
                ...prevTables,
                [activeTable]: prevTables[activeTable].map((item) =>
                    item.id === editingId ? { ...item, ...editedData } : item
                ),
            }));

            setEditingId(null);
            setEditedData({});
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/${activeTable.toLowerCase()}/${id}`);
            
            if (response.data.status === "ok") {
                setTables((prevTables) => ({
                    ...prevTables,
                    [activeTable]: prevTables[activeTable].filter((item) => item.id !== id),
                }));
            } else {
                console.error("Failed to delete record:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const confirmDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            handleDelete(id);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Database className="h-6 w-6" />
                        Database Administration
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => setShowAddModal(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Add Record
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-lg shadow">
                    <div className="border-b p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-4">
                                {Object.keys(tables).map((tableName) => (
                                    <button
                                        key={tableName}
                                        onClick={() => setActiveTable(tableName)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTable === tableName ? " bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <Table className="h-4 w-4" />
                                        {tableName.charAt(0).toUpperCase() + tableName.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search records..."
                                        className="pl-10 pr-4 py-2 border rounded-lg w-64"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    {Object.keys(tables[activeTable]?.[0] || {}).map((key) => (
                                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tables[activeTable]?.filter(record =>
                                    JSON.stringify(record).toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((record) => (
                                    <tr key={record.id}>
                                        {Object.values(record).map((value, index) => (
                                            <td key={index} className="px-6 py-4 whitespace-nowrap">{value}</td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(record.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(record.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t px-4 py-3 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {tables[activeTable].length} records
                        </div>
                    </div>
                </div>
            </div>

            {/* Editing Modal */}
            {editingId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Edit Record</h2>
                            <button onClick={() => setEditingId(null)}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {Object.keys(editedData).map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        value={editedData[field] || ""}
                                        onChange={(e) =>
                                            setEditedData({ ...editedData, [field]: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder={`Enter ${field}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setEditingId(null)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
