import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
function ViewUser() {
  const params = useParams()
  const navigate = useNavigate()
  // const [searchparams] = useSearchParams()
  const [userData, setuserData] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {

    loadUser()

  }, [])

  const loadUser = async () => {
    try {
      const studentData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/${params.id}`);
      console.log("VIEWWWW", studentData.data[0])
      if (studentData.data[0] !== undefined) {
        setuserData(studentData.data[0])
      }
      setLoading(false)
    } catch (error) {
      alert("error")
    }
  }

  const deleteuser = async (id) => {
    try {
      const deleterecord = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/deleteEmployee/${id}`)
      console.log("delete")
      // loadUser();
      // redirect to home
      navigate("/");
    } catch (error) {

    }

  };

    return (
    // URL Param
    <>
      {
        isLoading ? <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div> : <div>
          <h1>{userData.name}</h1>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">ID Number : {userData._id}</h6>
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
                <tbody>

                  <tr key={userData._id}>
                    <td>{userData._id}</td>
                    <td>{userData.name}</td>
                    <td>{userData.gender}</td>
                    <td>{userData.dob}</td>
                    <td>{userData.salary}</td>
                    <td>{userData.designation}</td>
                    <td>{userData.department}</td>

                    <td>
                      {/* <Link to={`/portal/user/view_user/${user.id}`} className="btn btn-danger btn-sm mr-2 mb-2">View</Link> */}
                      <Link to={`/user/edit_user/${userData._id}`} className="btn btn-danger btn-sm mr-2 mb-2">Edit</Link>
                      <button onClick={() => { deleteuser(userData._id) }} className={`btn btn-sm mb-2 btn-warning`}>Remove</button>
                    </td>
                  </tr>


                </tbody>
              </table>
            </div>
          </div>



        </div>

      }</>
  )
}

export default ViewUser