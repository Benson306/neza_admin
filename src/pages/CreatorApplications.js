import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination
} from '@windmill/react-ui'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, ModalBody } from '@windmill/react-ui';

function CreatorsApplication() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const { uid } = useContext(AuthContext);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/creator_applications`)
    .then( response => response.json())
    .then(response => {
      setData(response);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
    })
  },[])


  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])

  // pagination setup
  const resultsPerPage = 5
  const totalResults = data.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1, data])

  const handleApprovals = (creator_id, type) => {
    fetch(`${process.env.REACT_APP_API_URL}/handle_approvals/${creator_id}/${type}`)
    .then(res => {
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
    })
    .catch((err)=>{
        toast.error('Failed.Server Error', {
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

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviewClick = async (pdf_name) => {
    setPdfUrl(`${process.env.REACT_APP_API_URL}/uploads/${pdf_name}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPdfUrl(null);
    setIsModalOpen(false);
  };

  return (
    <div className='w-full mx-auto'>
        <ToastContainer />

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalBody>
              <div className="mt-2">
                <iframe
                  title="PDF Preview"
                  src={pdfUrl}
                  width={"100%"}
                  height="500px"
                  style={{ border: 'none', zoom: '1.2', width: '100%' }}
                ></iframe>
              </div>
          </ModalBody>
        </Modal>

      { !loading && data.length > 0 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        Total Applications: <span className='font-semibold ml-2'>{data.length}</span>
      </div> }
      { !loading && data.length < 1 && <div className='capitalize flex my-3 mr-20 text-xs text-gray-600 dark:text-gray-400'>
        No Creator Applications
      </div> }
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell >Name/Email</TableCell>
              <TableCell >ID Number</TableCell>
              <TableCell >KRA PIN</TableCell>
              <TableCell >Country</TableCell>
              <TableCell >National ID</TableCell>
              <TableCell >KRA PIN</TableCell>
              <TableCell >Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
              !loading && !error && dataTable1.slice().reverse().map( (item, i) => (
              <TableRow key={i}>
                <TableCell>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.email}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.id_number}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.kra_number}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{item.country}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">
                  <button
                  className='text-blue-500 underline text-xs'
                  onClick={(e)=>{
                    e.preventDefault();
                    handlePreviewClick(item.id_file);
                  }}
                  >View ID</button>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">
                  <button
                  className='text-blue-500 underline text-xs'
                  onClick={(e)=>{
                    e.preventDefault();
                    handlePreviewClick(item.kra_file);
                  }}
                  >View KRA PIN</button>
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 text-sm capitalize">
                    <button 
                    onClick={e => {
                        e.preventDefault();
                        handleApprovals(item.creator_id, 0);
                    }}
                    className="p-2 bg-blue-500 text-white rounded">
                        Approve
                    </button>
                    <button 
                    onClick={e => {
                        e.preventDefault();
                        handleApprovals(item.creator_id, 1);
                    }}
                    className="p-2 bg-red-500 text-white rounded">
                        Reject
                    </button>
                  </div>
                </TableCell>
              </TableRow>
              ) )
            }
            {
              loading && 
              <TableCell>
                <span>Loading.......</span>
              </TableCell>
            }
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

    
    </div>
  )
}

export default CreatorsApplication