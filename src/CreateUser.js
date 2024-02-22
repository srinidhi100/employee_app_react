import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function CreateUser(editValues) {
    const navigate = useNavigate()
    useEffect(() => {
        if(editValues.data)
        formik.setValues(editValues.data)
    }, [])


    const formik = useFormik({
        initialValues: {

            name: "",
            dob: "",
            department: "",
            designation: "",
            salary: "",
            salary: "",
            gender: "",
            id: ""
        },
        validate: (values) => {
            let error = {};
            if (values.name === "") {
                error.name = "please enter a value"
            }
            if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
                error.name = "Number of Characters should be between 2 - 15"
            }
            if (values.department === "") {
                error.department = "please enter department"
            }
            if (values.designation === "") {
                error.designation = "please select a designation"
            }
            if (values.gender === "") {
                error.gender = "please select gender"
            }
            if (values.salary.toString() === "") {
                error.salary = "please enter  8 digit salary Number"
            }
            if (values.salary.toString() && values.salary.toString().length !== 8) {
                error.salary = "please enter a valid 8 digit salary Number"
            }
            return error;
        },
        onSubmit: async (values) => {
            try {
                if(editValues.data)
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/editEmployee/${editValues.data._id}`, values);
                else
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createEmployee`, values);
                alert("Success")
                navigate("/")
                
            } catch (error) {
                alert("Error")
            }
        }
    });
    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label for="">User Name</label>
                            <input
                                name='name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                type={'text'}
                                className={`form-control ${formik.touched.name && formik.errors.name ? "error-box" : ""} ${formik.touched.name && !formik.errors.name ? "success-box" : ""}`}></input>
                            {
                                formik.touched.name && formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label for="">department</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='department'
                                value={formik.values.department}
                                type={'text'}
                                className={`form-control ${formik.touched.department && formik.errors.department ? "error-box" : ""} ${formik.touched.department && !formik.errors.department ? "success-box" : ""}`}>
                            </input>
                            {
                                formik.touched.department && formik.errors.department ? <span style={{ color: 'red' }}>{formik.errors.department}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <label for="">designation</label>
                            <select
                                name='designation'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.designation}
                                className={`form-control ${formik.touched.designation && formik.errors.designation ? "error-box" : ""} ${formik.touched.designation && !formik.errors.designation ? "success-box" : ""}`}>
                                <option disabled> </option>
                                <option>India</option>
                                <option>America</option>
                                <option>China</option>
                            </select>
                            {
                                formik.touched.designation && formik.errors.designation ? <span style={{ color: 'red' }}>{formik.errors.designation}</span> : null
                            }
                        </div>
                    </div>
                    
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <label for="">salary</label>
                            <input
                                name='salary'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.salary}
                                type={'number'}
                                className={`form-control ${formik.touched.salary && formik.errors.salary ? "error-box" : ""} ${formik.touched.salary && !formik.errors.salary ? "success-box" : ""}`}>
                            </input>
                            {
                                formik.touched.salary && formik.errors.salary ? <span style={{ color: 'red' }}>{formik.errors.salary}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <label for="">Date of Birth</label>
                            <input
                                name='dob'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dob}
                                type={'date'}
                                className={`form-control ${formik.touched.dob && formik.errors.dob ? "error-box" : ""} ${formik.touched.dob && !formik.errors.dob ? "success-box" : ""}`}>
                            </input>
                            {
                                formik.touched.dob && formik.errors.dob ? <span style={{ color: 'red' }}>{formik.errors.dob}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <label for="">Gender</label>
                            <select
                                name='gender'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                                className={`form-control ${formik.touched.gender && formik.errors.gender ? "error-box" : ""} ${formik.touched.gender && !formik.errors.gender ? "success-box" : ""}`}>
                                <option disabled> </option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {
                                formik.touched.gender && formik.errors.gender ? <span style={{ color: 'red' }}>{formik.errors.gender}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='form-group'>
                            <input type={'submit'} className='btn btn-primary'></input>

                        </div>
                    </div>



                </div>
            </form>
        </div>
    )
}

export default CreateUser