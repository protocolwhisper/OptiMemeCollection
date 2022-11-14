import { useAccount, useContractRead } from 'wagmi';
import { useEffect, useState } from 'react';
import OptiMeme from '../../contracts/optiMeme.json';
const optiMemeContractAddress: string = process.env.NEXT_PUBLIC_OPTI_MEME_ADDRESS as string;



function UserBalance() {
    const [balance, setBalance]: [any, any] = useState('');
    const { address } = useAccount({
        onConnect({ address, isReconnected }) {
          
        },
      });
   
    const { data, isError, isLoading } = useContractRead({
      address: optiMemeContractAddress,
      abi: OptiMeme.abi,
      functionName: 'balanceOf',
      args: [address, 1],
      onSettled(data: any, error) {
           
            setBalance(parseInt (data._hex, 16))
 
       
    },
    })

    const [mounted, setMounted] = useState(false);
 

      useEffect(() => setMounted(true), []);
      if (!mounted) return null;
      
      return( <div>
        { address && (
            <p className="text-dark">
                {`My Memes: ${balance}`} 
                
            
            </p> )
        }

        </div>
    )
  }

export default UserBalance;