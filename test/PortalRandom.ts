import {ethers} from 'hardhat'


async function randao() {
    // We will use the Optimis Goerli With this accounts 
    //PRTL TOKEN: 0x83B4ad3f09087DEF9d8cFe069D56a1e79bB13006 , VRFServiceOIC :0x7c704c43cB9D142579c2392Ae45e1579BcD2431B
    

    //----Let's deploy the VRFClientContract-----

    const deployVRF = 
    //Impersonification of an account with the portal token
    const impersonatedSigner = await ethers.getImpersonatedSigner("0x1234567890123456789012345678901234567890");

}