import styled from "styled-components"
import avatar from '../../images/dummy-avatar.png'

const StyledProfileHeader = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border-color);

    img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
`

const ProfileInfo = styled.div`
    .Name {
        font-weight: 600;
        font-size: 42px;
    }

    .Strength-bar {
        display: flex;
        width: 475px;
        height: 15px;
        background-color: #e5e5e5;
        margin-bottom: 10px;
    }

    .Current {
        width: 75%;
        height: 15px;
        background-color: #8343e7;
        margin-bottom: 10px;
    }

    .Strength-text {
        font-size: 14px;
    }
`

const ProfileHeader = () => {
    return(
        <StyledProfileHeader>
            <img src={avatar} alt="avatar"/>
            <ProfileInfo>
                <div className="Name">Hi Mubashir</div>
                <div className="Strength-bar">
                    <div className="Current"></div>
                </div>
                <div className="Strength-text"><b>Profile Strength:</b> Strong</div>
            </ProfileInfo> 
        </StyledProfileHeader>
    )
}

export default ProfileHeader;