import { Search, Trash2, Edit2, Database, Table } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminDashboard() {
    const [activeTable, setActiveTable] = useState("users");
    const [searchQuery, setSearchQuery] = useState("");
    const [tables, setTables] = useState({
        users: [],
        Laboratory: [],
        Doctor: [],
        Appointment: [],
    });
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, drResponse, labResponse, appointmentResponse] = await Promise.all([
                    axios.get("http://localhost:8000/api/user"),
                    axios.get("http://localhost:8000/api/doctor"),
                    axios.get("http://localhost:8000/api/laboratory"),
                    axios.get("http://localhost:8000/api/appointment"),
                ]);

                setTables({
                    users: usersResponse.data.data.map((user) => ({
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
                    Doctor: drResponse.data.data.map((dr) => ({
                        id: dr._id,
                        fullName: dr.fullName,
                        email: dr.email,
                        yearsOfExperience: dr.yearsOfExperience,
                        contactNumber: dr.contactNumber,
                        clinicAddress: dr.clinicAddress,
                        specialization: dr.specialization,
                        licenseNumber: dr.licenseNumber,
                        termsAccepted: dr.termsAccepted

                    })),
                    Laboratory: labResponse.data.data.map((lab) => ({
                        id: lab._id,
                        labName: lab.labName,
                        email: lab.email,
                        pincode: lab.pincode,
                        testTypes: lab.testTypes,
                        time: lab.time,
                        location: lab.location,
                        contactNumber: lab.contactNumber,
                    })),
                    Appointment: appointmentResponse.data.data.map((appt) => ({
                        id: appt._id,
                        fullName: appt.fullName,
                        email: appt.email,
                        contactNumber: appt.contactNumber,
                        birthDate: appt.birthDate,
                        gender: appt.gender,
                        time: appt.time,
                        doctor: appt.doctor,
                        department: appt.department,
                        messageBox: appt.messageBox,
                    })),
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data from the server.");
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/delete/${activeTable.toLowerCase()}/${id}`
            );
            if (response.status === 200) {
                setTables((prevTables) => ({
                    ...prevTables,
                    [activeTable]: prevTables[activeTable].filter((item) => item.id !== id),
                }));
                toast.success("Record deleted successfully.");
                setIsDeleteModalOpen(false);
            } else {
                toast.error("Failed to delete record.");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            toast.error("Error deleting record.");
        }

        try {
            const response = await axios.delete(
                `http://localhost:8000/api/delete/user/${id}`
            );
            if (response.status === 200) {
                setTables((prevTables) => ({
                    ...prevTables,
                    [activeTable]: prevTables[activeTable].filter((item) => item.id !== id),
                }));
                toast.success("Record deleted successfully.");
                setIsDeleteModalOpen(false);
            } else {
                toast.error("Failed to delete record.");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            toast.error("Error deleting record.");
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = async (updatedData) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/update/${activeTable.toLowerCase()}/${currentRecord.id}`,
                updatedData
            );

            if (response.status === 200) {
                setTables((prevTables) => ({
                    ...prevTables,
                    [activeTable]: prevTables[activeTable].map((item) =>
                        item.id === currentRecord.id ? { ...item, ...updatedData } : item
                    ),
                }));
                toast.success("Record updated successfully.");
                setEditModalOpen(false);
            } else {
                toast.error("Failed to update record.");
            }
        } catch (error) {
            console.error("Error updating record:", error);
            toast.error("Error updating record.");
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
                </header>

                <div className="bg-white rounded-lg shadow">
                    <div className="border-b p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-4">
                                {Object.keys(tables).map((tableName) => (
                                    <button
                                        key={tableName}
                                        onClick={() => setActiveTable(tableName)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTable === tableName
                                                ? "bg-blue-50 text-blue-600"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <Table className="h-4 w-4" />
                                        {tableName.charAt(0).toUpperCase() + tableName.slice(1)}
                                    </button>
                                ))}
                            </div>
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
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    {Object.keys(tables[activeTable]?.[0] || {}).map((key) => (
                                        <th
                                            key={key}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tables[activeTable]
                                    ?.filter((record) =>
                                        JSON.stringify(record)
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase())
                                    )
                                    .map((record) => (
                                        <tr key={record.id}>
                                            {Object.values(record).map((value, index) => (
                                                <td
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                >
                                                    {value}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentRecord(record);
                                                            setEditModalOpen(true);
                                                        }}
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
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Edit Record</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit(currentRecord);
                            }}
                        >
                            {Object.keys(currentRecord || {}).map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {key}
                                    </label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border rounded-lg w-full"
                                        value={currentRecord[key]}
                                        onChange={(e) =>
                                            setCurrentRecord((prev) => ({
                                                ...prev,
                                                [key]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">
                            Are you sure you want to delete this record? This action cannot
                            be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
