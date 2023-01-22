import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../context/authenticationContext';
import { registerUser } from '../Web3Client';
import { FlexRow, InputGroup, Title } from './styles/Section.styled';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: "40px"
    },
};

const RegistrationPopup = ({ isOpenModal, handleClose }) => {
    const navigate = useNavigate()
    const  { providerStatus } = useContext(AuthenticationContext)
    const [formData, setFormData] = useState({
        fullName: "",
        accountType: "Candidate"
    })
    
    const handleChange = (event) => {
        setFormData(
            prevFormData => ({
                ...prevFormData, [event.target.name]: event.target.value
            })
        )
    }
    
    const handleSubmit = async () => {
        const res = await registerUser(
            formData.fullName, 
            formData.accountType, 
            providerStatus.connectedAccount
        )

        if (res) {
            handleClose()
            navigate("/account/about")
        }
    }

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpenModal}
            onRequestClose={() => handleClose}
            contentLabel="Example Modal"
            style={customStyles}
            shouldCloseOnOverlayClick={false} 
            >
            <Title>You are not registered with the Site!</Title>
            <form>
                <FlexRow>
                    <InputGroup>
                        <label>Full Name<sup>*</sup></label>
                        <input 
                            name="fullName"
                            type="text"
                            placeholder="Omer Assem Taubar"
                            onChange={handleChange}
                            value={formData.fullName}
                            required
                        />
                        <label>It will be stored on Blockchain and can't be changed later.</label>
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <InputGroup>
                        <label>Account Type<sup>*</sup></label>
                        <select  
                            name="accountType" 
                            value={formData.accountType}
                            onChange={handleChange}>
                            <option value="Candidate">Candidate</option>
                            <option value="Company">Company</option>
                        </select>
                    </InputGroup>
                </FlexRow>
                <FlexRow>
                    <button type="button" onClick={handleSubmit}>
                        Register
                    </button>
                </FlexRow>
            </form>
        </Modal>
    )
}

export default RegistrationPopup