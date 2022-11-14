import * as React from 'react'
import { useState } from 'react';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce';
import { BigNumber, BigNumberish, utils } from 'ethers';
import { Card, Modal, Button  } from 'react-bootstrap';
import OptiMeme from '../../../contracts/optiMeme.json';


export function PurchaseTokens() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [amountToMint, setAmountToMint] = useState(0);
  const addAmount = () => setAmountToMint(amountToMint + 1);
  const subtractAmount = () => {
    if (amountToMint > 0){
      setAmountToMint(amountToMint - 1)
      }
    };

    const { address } = useAccount({
      onConnect({ address, isReconnected }) {
        
      },
    });

  const debouncedAmount = useDebounce((amountToMint/10).toString(), 500);
  const optiMemeContractAddress: string = process.env.NEXT_PUBLIC_OPTI_MEME_ADDRESS as string;

  const { config } = usePrepareContractWrite({
    address: optiMemeContractAddress,
    abi: OptiMeme.abi,
    functionName: 'mint',
    args: [address,  1, amountToMint, '0x']
    
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    
        
      <Card  >
        
        <Modal.Header  closeButton>
        <Modal.Title className='fs-1'><b>Mint</b></Modal.Title>
        </Modal.Header>
        <form className=""
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
        
      >
        <Modal.Body  >
        



          
          
       <b>Select the amount of Memes to mint: {amountToMint}  </b><br/>
        <button className='border-0 mt-4 mx-2' onClick={subtractAmount}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-dash-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg></button>
                          <button className='border-0 mt-4' onClick={addAmount}> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>

        </Modal.Body>
          <Modal.Footer  className='padding-bottom-btn'>
          <button className='btn btn-light ' disabled={!write || isLoading} onClick={() => {if(write){write()}}}>
          {isLoading ? 'Processing Purchase...' : 'Mint Now'}
        </button>
        {isSuccess && (
          <div>
            Successfully purchased Memes!
            <div>
              <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
        </Modal.Footer>
        </form>        
        
       
      </Card>
    
      )}

export default PurchaseTokens;
  
    
  
