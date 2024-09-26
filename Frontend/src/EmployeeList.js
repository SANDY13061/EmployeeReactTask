import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid, RadioGroup, FormControlLabel, Radio, Select, MenuItem
} from '@mui/material';
import { useTable } from 'react-table';
import { Formik, Form, Field, ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup';

const coursesList = [
    { value: 'MCA', label: 'MCA' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BSC', label: 'BSC' }    // Add more courses as needed
];

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [image, setImage] = useState(null); // State to hold the selected image file
    const [errorEmail, setErrorEmail] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/employees/all', config);
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteEmployee = async (id) => {
        // Your existing code for deleting an employee
        console.log('Delete employee with id:', id);
        try {
            const token = localStorage.getItem('auth-token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(`http://localhost:5000/api/employees/delete/${id}`,config);
            setCurrentEmployee(null);
            setImage(null); // Reset image after submission
            // Refresh employee list
            const tokenlist = localStorage.getItem('auth-token');
            const configlist = {
                headers: {
                    Authorization: `Bearer ${tokenlist}`,
                },
            };
            const responselist = await axios.get('http://localhost:5000/api/employees/all', configlist);
            setEmployees(responselist.data);
        } catch (err) {
            setError('Failed to fetch employees.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setOpenModal(true);
        setImage(null); // Reset image when opening the edit modal
    };

    const handleCreateEmployee = () => {
        setCurrentEmployee(null);
        setOpenModal(true);
        setImage(null); // Reset image when creating new employee
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentEmployee(null);
        setImage(null); // Reset image on modal close
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setErrorEmail('')
        const employeeData = {
            f_Name: values.f_Name,
            f_Email: values.f_Email,
            f_Mobile: values.f_Mobile,
            f_Designation: values.f_Designation,
            f_Course: values.f_Course[0],
            f_Gender: values.f_Gender,
            f_Image: image ,
        }
        
        console.log(employeeData, values, image);

        try {
            if (currentEmployee) {
                const token = localStorage.getItem('auth-token');
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Edit employee
                await axios.put(`http://localhost:5000/api/employees/update/${currentEmployee.id}`, employeeData, config);
            } else {
                // Create employee
                const token = localStorage.getItem('auth-token');
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post('http://localhost:5000/api/employees/create', employeeData, config);
            }
            setOpenModal(false);
            setCurrentEmployee(null);
            setImage(null); // Reset image after submission
            // Refresh employee list
            const token = localStorage.getItem('auth-token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:5000/api/employees/all', config);
            setEmployees(response.data);
        } catch (err) {
            console.error(err.response.data);
            setErrorEmail(err.response.data);
            
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]); // Update the state with the selected file
        }
    };

    const filteredEmployees = Array.isArray(employees) ? employees.filter((employee) =>
        employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const data = React.useMemo(() => filteredEmployees, [filteredEmployees]);

    const columns = React.useMemo(
        () => [
            { Header: 'Unique Id', accessor: 'id' },
            { Header: 'Image', accessor: 'f_Image', Cell: ({ value }) => value ? <img src={`data:image/png;base64,${value}`} alt="Employee" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> : 'No Image' },
            { Header: 'Name', accessor: 'f_Name' },
            { Header: 'Email', accessor: 'f_Email' },
            { Header: 'Mobile No', accessor: 'f_Mobile' },
            { Header: 'Designation', accessor: 'f_Designation' },
            { Header: 'Gender', accessor: 'f_Gender', 
                Cell: ({ value }) => value === 'M' ? 'Male' : value === 'F' ? 'Female' : value 
            },
            { Header: 'Course', accessor: 'f_Course' },
           
            { Header: 'Action', accessor: 'actions', Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" color="primary" onClick={() => handleEditEmployee(row.original)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteEmployee(row.original.id)}>Delete</Button>
                </div>
            ) },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        f_Name: Yup.string()
            .required('Name is required'),
        f_Email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        f_Mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]+$/, 'Mobile number must be numeric')
            .min(10, 'Mobile number must be at least 10 digits')
            .max(10, 'Mobile number cannot exceed 10 digits'),
        f_Designation: Yup.string()
            .required('Designation is required'),
        f_Gender: Yup.string()
            .oneOf(['M', 'F'], 'Gender must be either Male or Female')
            .required('Gender is required'),
        f_Course: Yup.array()
            .min(1, 'Select at least one course')
            .required('Select at least one course'),

        
    });

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" style={{ padding: '10px', textAlign: 'center', color: '#333' }}>Employee List</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Total Count: {filteredEmployees.length}</span>
                <Button variant="contained" color="success" onClick={handleCreateEmployee}>Create Employee</Button>
            </div>
            <TextField
                label="Enter Search Keyword"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                style={{ marginBottom: '20px', borderRadius: '5px' }}
            />
            <TableContainer component={Paper} elevation={3}>
                <Table {...getTableProps()} stickyHeader>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()} style={{ backgroundColor: '#3f51b5', color: '#fff' }}>{column.render('Header')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openModal} onClose={handleModalClose} fullWidth maxWidth="sm">
                <DialogTitle>{currentEmployee ? 'Edit Employee' : 'Create Employee'}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            f_Name: currentEmployee ? currentEmployee.f_Name : '',
                            f_Email: currentEmployee ? currentEmployee.f_Email : '',
                            f_Mobile: currentEmployee ? currentEmployee.f_Mobile : '',
                            f_Designation: currentEmployee ? currentEmployee.f_Designation : '',
                            f_Gender: currentEmployee ? currentEmployee.f_Gender : '',
                            f_Course: currentEmployee ? [currentEmployee.f_Course] : [],
                        }}
                        validationSchema={validationSchema}
                        onChange={(e) => setErrorEmail('')}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            margin="dense"
                                            label="Name"
                                            name="f_Name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                        <ErrorMessage name="f_Name" component="div" style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            margin="dense"
                                            label="Email"
                                            name="f_Email"
                                            type="email"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                        <ErrorMessage name="f_Email" component="div" style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            margin="dense"
                                            label="Mobile No"
                                            name="f_Mobile"
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                        <ErrorMessage name="f_Mobile" component="div" style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={Select}
                                            name="f_Designation"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            margin="dense"
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} // For accessibility
                                        >
                                            <MenuItem value="" disabled>Select a designation</MenuItem>
                                            <MenuItem value="HR">HR</MenuItem>
                                            <MenuItem value="Manager">Manager</MenuItem>
                                            <MenuItem value="Sales">Sales</MenuItem>
                                           
                                            {/* Add more designations as needed */}
                                        </Field>
                                        <ErrorMessage name="f_Designation" component="div" style={{ color: 'red' }} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="f_Gender">
                                            {({ field }) => (
                                                <RadioGroup {...field} row>
                                                    <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                </RadioGroup>
                                            )}
                                        </Field>
                                        <ErrorMessage name="f_Gender" component="div" style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FieldArray name="f_Course">
                                            {({ form, push, remove }) => (
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p>Select Course:</p>
                                                    {coursesList.map((course) => (
                                                        <div key={course.value} style={{ marginBottom: '10px' }}>
                                                            <Field
                                                                type="checkbox"
                                                                name="f_Course"
                                                                value={course.value}
                                                                checked={form.values.f_Course?.includes(course.value)}
                                                                onChange={() => {
                                                                    // Manually set the value to ensure only one checkbox is selected
                                                                    form.setFieldValue("f_Course", [course.value]);
                                                                }}
                                                            />
                                                            <label>{course.label}</label>
                                                        </div>
                                                    ))}
                                                    <ErrorMessage name="f_Course" component="div" style={{ color: 'red' }} />
                                                </div>
                                            )}
                                        </FieldArray>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Button variant="outlined" component="span" fullWidth>
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                                        {image && (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Preview"
                                                style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{alignItems:"center"}}>
                                <p style={{color:'red'}}>{errorEmail}</p>
                                </Grid>
                                <DialogActions style={{ marginTop: '20px' }}>
                                    
                                    <Button onClick={handleModalClose} color="primary">Cancel</Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        {currentEmployee ? 'Update' : 'Create'}
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EmployeeList;