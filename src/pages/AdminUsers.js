import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Input, HelperText, Label, Select, Textarea
  } from '@windmill/react-ui'
  import { EditIcon, TrashIcon } from '../icons'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function AdminUsers() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [masterPassword, setMasterPassword] = useState(null);

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function openEditModal() {
      setIsEditModalOpen(true)
    }

    function closeEditModal() {
      setPassword(null);
      setConfirmPassword(null);
      setMasterPassword(null);
      setEmail(null);
      setId(null);
      setIsEditModalOpen(false)
    }

    function openDeleteModal() {
      setIsDeleteModalOpen(true)
    }

    function closeDeleteModal() {
        setIsDeleteModalOpen(false)
    }

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/admin_users`)
      .then( response => response.json())
      .then(response => {
        setUsers(response);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      })
    },[isModalOpen, isEditModalOpen, isDeleteModalOpen])

    const handleDelete = (id) => {
     
      fetch(`${process.env.REACT_APP_API_URL}/del_admin_users/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          masterPassword
        })
      })
      .then( response => {

        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          closeDeleteModal();
        }else{
          toast.error('Wrong Credentials', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
        
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }

    const handleSubmit = () => {

        if(password == null || confirmPassword == null || email == null){
          toast.error('All fields are required', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          return;
        }

        if(confirmPassword !== password){
          toast.error('Password does not match', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/add_admin_user`,{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            password,
            email
          })
        })
        .then(response => {
          if(response.ok){
            toast.success('Success', {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              closeModal();
          }else{
            toast.error('Email has been used', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
        })
        .catch(err => {
          toast.error('Server Error', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        })
    }

    const handleEdit = () => {

      if(password == null || confirmPassword == null || email == null || masterPassword == null){
        toast.error('All fields are required', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return;
      }

      if(confirmPassword !== password){
        toast.error('Password does not match', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return;
      }

      fetch(`${process.env.REACT_APP_API_URL}/update_admin_users/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          password,
          email,
          masterPassword
        })
      })
      .then(response => {
        if(response.ok){
          toast.success('Success', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            closeEditModal();
        }else{
          toast.error('Check your credentials', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      .catch(err => {
        toast.error('Server Error', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }
  return (
    <div>
      <ToastContainer />
        <PageTitle>Admin Users</PageTitle>

        <div className='flex justify-end mr-20 mb-10'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>+ Add Admin User</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Add Admin User</ModalHeader>
        <ModalBody>

          <Label >
            <span>Email</span>
            <Input type="text" className="mt-2" onChange={e => setEmail(e.target.value)} placeholder="Neza Brand" />
          </Label>
          <Label className="mt-1">
            <span>Password</span>
            <Input type="password" className="mt-2" onChange={e => setPassword(e.target.value)} placeholder="*******" />
          </Label>
          <Label className="mt-1">
            <span>Confirm Password</span>
            <Input type="password" onChange={e => setConfirmPassword(e.target.value)} className="mt-2" placeholder="******" />
          </Label>
          
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white"
            onClick={()=> handleSubmit()}
            >Submit</Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full" block size="large"
            onClick={()=> handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalHeader>Edit Brand Details</ModalHeader>
        <ModalBody>

          <Label className="mt-1">
            <span>Email</span>
            <Input type="email" 
              onChange={e => setEmail(e.target.value)} 
              className="mt-2" 
              placeholder="Neza Brand"
              value={email}
            />
          </Label>

          <Label >
            <span>Password</span>
            <Input
              type="password"
              className="mt-2" 
              onChange={e => setPassword(e.target.value)} 
              placeholder="********"
            />
          </Label>
          <Label className="mt-1">
            <span>Confirm Password</span>
            <Input
              type="password" 
              className="mt-2" 
              onChange={e => setConfirmPassword(e.target.value)} 
              placeholder="********"
            />
          </Label>

          <Label className="mt-1">
            <span className='text-red-500'>Master Password</span>
            <Input
              type="password" 
              className="mt-2" 
              onChange={e => setMasterPassword(e.target.value)} 
              placeholder="********"
            />
          </Label>
          
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeEditModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white"
            onClick={()=> handleEdit()}
            >Submit</Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeEditModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full" block size="large"
            onClick={()=> handleEdit()}
            >
              Submit
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>

          <Label className="mt-1">
            <span className='text-red-500'>Enter Master Password to complete deletion</span>
            <Input
              type="password" 
              className="mt-2" 
              onChange={e => setMasterPassword(e.target.value)} 
              placeholder="********"
            />
          </Label>
          
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white"
            onClick={()=> 
              handleDelete(id)
            }
            >Submit</Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full" block size="large"
            onClick={()=> handleDelete(id)}
            >
              Submit
            </Button>
          </div>
        </ModalFooter>
      </Modal>

        <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
          {!loading && users.length > 0 && users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.date}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" onClick={
                        e => {
                          setEmail(user.email);
                          setId(user._id);
                          openEditModal();
                        }
                      } />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={e=>{
                      //handleDelete(user._id);
                      setId(user._id);
                      openDeleteModal();
                    }}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {
            !loading && users.length < 1 && 
            <TableRow>
              <TableCell colspan={5} className='text-center text-gray-500 text-sm p-2'>
                  No records to show
              </TableCell>
            </TableRow>
            }

            
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>
    </div>
  )
}

export default AdminUsers