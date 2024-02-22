import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function User() {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        try {
            const userData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employeeData`);
            console.log("userData", userData.data)
            setUsers(userData.data)
            setLoading(false)
        } catch (error) {
            alert("error")
        }
    }

    const deleteuser = async (id) => {
        try {
            const deleterecord = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteEmployee/${id}`)
            console.log("delete")
            loadUser();
            // redirect to home
            // navigate("/portal/teacher");
        } catch (error) {

        }
    }


    return (
        <div className="container-fluid">

            <h1 className="h3 mb-2 text-gray-800">My Employees</h1>
            <Link to="/create_user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-download fa-sm mb-10 text-white-50"></i> Create a Employee</Link>
            {
                isLoading ? <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div> : <div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">My Employees</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Dob</th>
                                        <th>Salary</th>
                                        <th>Designation</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>-</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {users.map((user) => {
                                        return <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.dob}</td>
                                            <td>{user.salary}</td>
                                            <td>{user.designation}</td>
                                            <td>{user.department}</td>
                                            <td>
                                                <Link to={`/user/view_user/${user._id}`} className="btn btn-info btn-sm mr-2 mb-2">View</Link>
                                                <Link to={`/user/edit_user/${user._id}`} className="btn btn-secondary btn-sm mr-2 mb-2">Edit</Link>
                                                <button onClick={() => { deleteuser(user._id) }} className="btn btn-danger btn-sm mb-2">Remove</button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Other Students</h6>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Marks</th>
                                        <th>Class</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Marks</th>
                                        <th>Class</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>

                                    {users.filter(stu => !stu.Selected).map((user) => {
                                        return <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.marks}</td>
                                            <td>{user.class}</td>
                                            <td>
                                                <button onClick={() => { addStudent(user) }} className="btn btn-warning btn-sm mr-2 mb-2">Add +</button>
                                                <Link to={`/portal/user/view_user/${user.id}`} className="btn btn-info btn-sm mr-2 mb-2">View</Link>
                                                <Link to={`/portal/user/edit_user/${user.id}`} className="btn btn-secondary btn-sm mr-2 mb-2">Edit</Link>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div> */}

                </div>}
        </div>
    )
}

export default User