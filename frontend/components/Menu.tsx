import Image from 'next/image';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function NavBar() {

  return (
    <>
      
        <Navbar fixed="top"  key={'lg'}  expand={'lg'}>
          <Container fluid>
          <Navbar.Brand href="#" className='pt-2 px-1 gradient-text'><b><h2 ></h2></b></Navbar.Brand>
          <Navbar.Brand href="#" className='mt-2 px-2 gradient-text ' id='memHmenu'><b><h2>MemH</h2></b></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'lg'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
              placement="end"
              className='bg-secondary pt-1 mx-auto special-background'
            >
              <Offcanvas.Header closeButton>
     
              </Offcanvas.Header>
              <Offcanvas.Body>
         
                <Nav className="my-2 my-lg-0  mx-auto">
                <Nav.Link href="/" ><button className='btn btn-lg btn-light fw-bold custombtn' id='menuBtn'>Home</button></Nav.Link>
            <Nav.Link href="/mint" ><button className='btn btn-lg btn-light fw-bold custombtn' id='menuBtn'>Mint</button></Nav.Link>
            <Nav.Link href="/about" ><button className='btn btn-lg btn-light fw-bold custombtn' id='menuBtn'>About</button></Nav.Link>
            <Navbar.Brand href="#" className='fs-1 mt-2 px-2 gradient-text '><b><h2>MemH</h2></b></Navbar.Brand>
            <div className="pt-2">
            <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} className='btn btn-lg btn-light fw-bold custombtn' type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='btn btn-lg btn-danger fw-bold custombtn'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className='btn btn-lg btn-light fw-bold custombtn'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                            width={24}
                            height={24}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button" className='btn btn-lg btn-light fw-bold custombtn '>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                      
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
            </div>
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </> );
}

export default NavBar;