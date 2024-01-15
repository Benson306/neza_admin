import React, { useState } from 'react'
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

function Brands() {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }
  return (
    <div>
        <PageTitle>Brands</PageTitle>

        <div className='flex justify-end mr-20 mb-10'>
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white" onClick={openModal}>+ Add Brand</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Add Brand</ModalHeader>
        <ModalBody>

          <Label >
            <span>Brand Name</span>
            <Input className="mt-2" placeholder="Neza Brand" />
          </Label>
          <Label className="mt-1">
            <span>Company</span>
            <Input className="mt-2" placeholder="Neza" />
          </Label>
          <Label className="mt-1">
            <span>Email</span>
            <Input type="email" className="mt-2" placeholder="Neza Brand" />
          </Label>
          
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white">Accept</Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button class="bg-blue-600 p-2 rounded-lg text-sm text-white w-full" block size="large">
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
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            
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