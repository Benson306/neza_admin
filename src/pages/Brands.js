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

function Brands() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [brandName, setBrandName] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [country, setCountry] = useState("kenya");
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [deleteState, setDeleteState] = useState(false);

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
      setBrandName(null);
      setCompanyName(null);
      setCountry("kenya");
      setEmail(null);
      setId(null);
      setIsEditModalOpen(false)
    }

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/brands`)
      .then( response => response.json())
      .then(response => {
        setBrands(response);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      })
    },[isModalOpen, isEditModalOpen, deleteState])

    const handleDelete = (id) => {
     
      fetch(`${process.env.REACT_APP_API_URL}/del_brand/${id}`,{
        method: "DELETE"
      })
      .then( response => {
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
          setDeleteState(true);
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

        if(brandName == null || companyName == null || email == null || country == null){
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

        fetch(`${process.env.REACT_APP_API_URL}/add_brand`,{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            brandName,
            companyName,
            email,
            country
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

      if(brandName == null || companyName == null || email == null || country == null){
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

      fetch(`${process.env.REACT_APP_API_URL}/update_brand/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          brandName,
          companyName,
          email,
          country
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
  return (
    <div>
      <ToastContainer />
        <PageTitle>Companies</PageTitle>

        <div className='flex justify-end mr-20 mb-10'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>+ Add A Company</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Add A Company</ModalHeader>
        <ModalBody>
          <Label className="mt-1">
            <span>Company</span>
            <Input className="mt-2" onChange={e => setCompanyName(e.target.value)} placeholder="Neza" />
          </Label>
          <Label >
            <span>Brand Name</span>
            <Input className="mt-2" onChange={e => setBrandName(e.target.value)} placeholder="Neza Brand" />
          </Label>
          <Label className="mt-1">
            <span>Country</span>
            <Select 
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                onChange={e => setCountry(e.target.value)}
              >
              <option value="kenya">Kenya</option>
              <option value="uganda">Uganda</option>
              <option value="sa">South Africa</option>
              <option value="nigeria">Nigeria</option>
            </Select>
          </Label>
          <Label className="mt-1">
            <span>Email</span>
            <Input type="email" onChange={e => setEmail(e.target.value)} className="mt-2" placeholder="Neza Brand" />
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
            >Accept</Button>
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
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalHeader>Edit Company Details</ModalHeader>
        <ModalBody>

          <Label >
          <Label className="mt-1">
            <span>Company</span>
            <Input className="mt-2" 
              onChange={e => setCompanyName(e.target.value)} 
              placeholder="Neza"
              value={companyName}
            />
          </Label>
            <span>Brand Name</span>
            <Input className="mt-2" 
              onChange={e => setBrandName(e.target.value)} 
              placeholder="Neza Brand"
              value={brandName}
            />
          </Label>
          <Label className="mt-1">
            <span>Country</span>
            <Select 
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                onChange={e => setCountry(e.target.value)}
                value={country}
              >
              <option value="kenya">Kenya</option>
              <option value="uganda">Uganda</option>
              <option value="sa">South Africa</option>
              <option value="nigeria">Nigeria</option>
            </Select>
          </Label>
          <Label className="mt-1">
            <span>Email</span>
            <Input type="email" 
              onChange={e => setEmail(e.target.value)} 
              className="mt-2" 
              placeholder="Neza Brand"
              value={email}
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
            >Accept</Button>
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
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

        <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Brand Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
          {!loading && brands.length > 0 && brands.map((brand, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{brand.brandName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{brand.companyName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{brand.country}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{brand.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{brand.date}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" onClick={
                        e => {
                          setBrandName(brand.brandName);
                          setCompanyName(brand.companyName);
                          setEmail(brand.email);
                          setId(brand._id);
                          openEditModal();
                        }
                      } />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={e=>{
                      handleDelete(brand._id);
                    }}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {
            !loading && brands.length < 1 && 
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

export default Brands