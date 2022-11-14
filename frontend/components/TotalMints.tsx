import { useAccount, useContractRead } from 'wagmi';
import { useEffect, useState } from 'react';
import OptiMeme from '../../contracts/optiMeme.json';
const optiMemeContractAddress: string = process.env.NEXT_PUBLIC_OPTI_MEME_ADDRESS as string;



function TotalMints() {
    const [balance, setBalance]: [any, any] = useState('');
    const { address } = useAccount({
        onConnect({ address, isReconnected }) {
          
        },
      });
   
      const { data, isError, isLoading } = useContractRead({
        address: optiMemeContractAddress,
        abi: OptiMeme.abi,
        functionName: 'getMintedAmount',
      
        onSettled(data: any, error) {
              console.log(data)
              setBalance(parseInt (data._hex, 16))
   
         
      },
      })

    const [mounted, setMounted] = useState(false);
 

      useEffect(() => setMounted(true), []);
      if (!mounted) return null;
      
      return( <div>
        { address && (
            <p className="text-dark">
                {`${balance} Memes minted`} 
                
            
            </p> )
        }

        </div>
    )
  }

export default TotalMints;