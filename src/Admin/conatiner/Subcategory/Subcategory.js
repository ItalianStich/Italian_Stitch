import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SubCategoryForm from './SubCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { setAlert } from '../../../user/redux/slice/Alert.slice';
import { addSubcategory, deleteSubcategory, getSubcategory, updateSubcategory } from '../../../user/redux/slice/Subcategory.slice';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg';
import Loader from '../../../user/UI/loader/Loader';

function Subcategory() {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch();

    const subcategory = useSelector(state => state.subcategory);
    const category = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getSubcategory())
    }, [])

    const handleSubmitForm = (data) => {
        if (update) {
            dispatch(updateSubcategory(data))
            dispatch(setAlert({ text: 'SubCategory successfully update', color: 'success' }))
        } else {
            dispatch(addSubcategory(data))
            dispatch(setAlert({ text: 'SubCategory successfully added', color: 'success' }))
        }
        setUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(deleteSubcategory(id))
        dispatch(setAlert({ text: 'SubCategory successfully deleted', color: 'success' }))
    }

    const handleUpdate = (data) => {
        setUpdate(data)
    }

    const columns = [
        {
            field: 'category_id', headerName: 'Category Name', flex: 2,
            renderCell: (params) => {
                const fData = category.category.filter((v) => v.id === params.row.category_id)
                return fData.length > 0 ? fData[0].category_name : null
            }
        },
        { field: 'sub_name', headerName: 'Subcategory Name', flex: 3 },
        {
            field: "action", headerName: "Action", flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
                            <EditIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
                            <DeleteIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            {subcategory.loading ?
                <Loader style={{ height: 'calc(100vh - 64px' }} /> :
                subcategory.error ?
                    <ErrorMsg style={{ height: "calc(100vh - 64px" }} text={subcategory.error} /> :
                    <>
                        <SubCategoryForm onHandleSubmit={handleSubmitForm} updateData={update} />
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={subcategory.subcategory}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />

                        </div>
                    </>
            }
        </div>
    );
}

export default Subcategory;