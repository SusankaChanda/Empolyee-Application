import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styling/createEmployee.css';

const CreateEmployee = ({addEmployee}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        designation: '', 
        selectedSkills: [],
        selectedFile: '',
        fileAddress:''
    });

    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            console.log('File uploaded successfully:', result);
            console.log("result = ",result.filePath)
            setFormData((prevFormData) => ({
                ...prevFormData,
                fileAddress: result.filePath
            }));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    

    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        phoneNumberError: '',
    });

    // Handling changes in the form fields
    const handleName = (event) => {
        const name = event.target.value;
        const nameRegex = /^[a-zA-Z\s]{1,29}$/;
        setFormData({ ...formData, name });
        setErrors({ ...errors, nameError: nameRegex.test(name) ? '' : 'Name must be less than 30 characters and contain only letters.' });
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setFormData({ ...formData, email });
        setErrors({ ...errors, emailError: emailRegex.test(email) ? '' : 'Please enter a valid email address.' });
    };

    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value;
        const phoneNumberRegex = /^\d{10}$/;
        setFormData({ ...formData, phoneNumber });
        setErrors({ ...errors, phoneNumberError: phoneNumberRegex.test(phoneNumber) ? '' : 'Please enter a valid 10-digit phone number.' });
    };

    const handleDesignationChange = (event) => {
        setFormData({ ...formData, designation: event.target.value });
    };

    const handleGenderChange = (event) => {
        setFormData({ ...formData, gender: event.target.value });
    };

    const handleSkillChange = (event) => {
        const { value, checked } = event.target;
        const updatedSkills = checked
            ? [...formData.selectedSkills, value]
            : formData.selectedSkills.filter((skill) => skill !== value);
        setFormData({ ...formData, selectedSkills: updatedSkills });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setFormData({ ...formData, selectedFile: file });
            setFile(event.target.files[0]);
        } else {
            alert('Please select a JPG or PNG image.');
        }
    };

    // Submitting form data using FormData for file upload
    // const callingAPI = async () => {
        
    //     const formDataToSend = new FormData();
    //     formDataToSend.append('name', formData.name);
    //     formDataToSend.append('email', formData.email);
    //     formDataToSend.append('phoneNumber', formData.phoneNumber);
    //     formDataToSend.append('gender', formData.gender);
    //     formDataToSend.append('designation', formData.designation);
    //     formDataToSend.append('selectedSkills', formData.selectedSkills.join(','));
    //     formDataToSend.append('selectedFile', formData.selectedFile);

    //     console.log(formDataToSend)

    //     try {
    //         const response = await axios.post('http://localhost:5000/create-new-employee', formDataToSend, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         if (response.status === 200) {
    //             alert('Employee Created Successfully');
    //             setFormData({
    //                 name: '',
    //                 email: '',
    //                 phoneNumber: '',
    //                 gender: '',
    //                 designation: '',
    //                 selectedSkills: [],
    //                 selectedFile: null,
    //             });
    //             setErrors({
    //                 nameError: '',
    //                 emailError: '',
    //                 phoneNumberError: '',
    //             });
    //         } else {
    //             alert('Error creating employee. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred. Please try again later.');
    //     }
    // };

    const handleSubmit = (event) => {

        event.preventDefault();

        handleUpload();

        // Basic validation before submitting the form
        if (!formData.name || errors.nameError) {
            alert('Please enter a valid name.');
            return;
        }
        if (errors.emailError) {
            alert('Please enter a valid email address.');
            return;
        }
        if (errors.phoneNumberError) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        if (!formData.selectedSkills.length) {
            alert('Please select at least one skill.');
            return;
        }
        if (!formData.selectedFile) {
            alert('Please select an image file (JPG or PNG).');
            return;
        }

        console.log(formData)

        addEmployee(formData)

        alert('Employee Created Successfully');
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    designation: '',
                    selectedSkills: [],
                    selectedFile: null,
                });
                setErrors({
                    nameError: '',
                    emailError: '',
                    phoneNumberError: '',
                });

       // callingAPI(); // Call API to submit the form data
    };

    const skills = ['MCA', 'BCA', 'BSA'];
    const genders = ['Male', 'Female', 'Others'];

    return (
        <div>
            <div className='main-container'>
                <div className='sub-container'>
                    <div className='new-employee-container'>
                        <Header />
                        <div className='new-employee-form-main-container'>
                            <div>
                                <h1 className='page-heading'>Create New Employee</h1>
                            </div>
                            <div className='new-employee-form-container form-inputs'>
                                <div className='form-center'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>
                                            {/* Name input */}
                                            <div className='input-bar-container'>
                                                <p className='input-bar-name'>Name of the Employee</p>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleName}
                                                    placeholder='Enter Name of the Employee .... '
                                                    className='input-bar'
                                                    required
                                                />
                                                {errors.nameError && <p className='error-message'>{errors.nameError}</p>}
                                            </div>

                                            {/* Email input */}
                                            <div className='input-bar-container'>
                                                <p className='input-bar-name'>Email Address</p>
                                                <input
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={handleEmailChange}
                                                    placeholder='Enter Email Address .... '
                                                    className='input-bar'
                                                    required
                                                />
                                                {errors.emailError && <p className='error-message'>{errors.emailError}</p>}
                                            </div>

                                            {/* Phone number input */}
                                            <div className='input-bar-container'>
                                                <p className='input-bar-name'>Mobile Number</p>
                                                <input
                                                    type="text"
                                                    value={formData.phoneNumber}
                                                    onChange={handlePhoneNumber}
                                                    placeholder='Enter Mobile Number .... '
                                                    className='input-bar'
                                                    maxLength={10}
                                                    required
                                                />
                                                {errors.phoneNumberError && <p className='error-message'>{errors.phoneNumberError}</p>}
                                            </div>

                                            {/* Designation dropdown */}
                                            <div className='input-bar-container'>
                                                <label className='input-bar-name' htmlFor="designation">Designation:</label>
                                                <select name="designation" id="designation" className='input-bar' value={formData.designation} onChange={handleDesignationChange}>
                                                    <option value='none' className='dropdown-menu-text'>Select an option</option>
                                                    <option value="hr">HR</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="sales">Sales</option>
                                                </select>
                                            </div>

                                            {/* Gender radio buttons */}
                                            <div className='input-bar-container radio-main-container'>
                                                <div className='radio-sub-container'>
                                                    <div className='input-bar-name'>Gender:</div>
                                                    {genders.map(genderOption => (
                                                        <div key={genderOption}>
                                                            <input
                                                                type="radio"
                                                                className='radio-button'
                                                                id={genderOption}
                                                                name="gender"
                                                                value={genderOption}
                                                                checked={formData.gender === genderOption}
                                                                onChange={handleGenderChange}
                                                            />
                                                            <label htmlFor={genderOption}> {genderOption}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skills checkboxes */}
                                            <div className='input-bar-container radio-main-container'>
                                                <div className='checkbox-sub-container'>
                                                    <h3 className='input-bar-name'>Course :</h3>
                                                    <div className='course-list'>
                                                        {skills.map(skill => (
                                                            <label key={skill}>
                                                                <input
                                                                    type="checkbox"
                                                                    value={skill}
                                                                    checked={formData.selectedSkills.includes(skill)}
                                                                    onChange={handleSkillChange}
                                                                    className='checkbox'
                                                                />
                                                                {skill}
                                                            </label>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>

                                            {/* File input */}
                                            <div className='input-bar-container'>
                                                <input
                                                    type="file"
                                                    accept="image/jpg, image/png"
                                                    onChange={handleFileChange}
                                                    className='file-input'
                                                    required
                                                />
                                            </div>

                                            {/* Submit button */}
                                            <div className='submit-button'>
                                                <button className='btn btn-primary submit-button' type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
