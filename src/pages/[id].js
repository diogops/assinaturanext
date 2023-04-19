import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import QRCode from 'qrcode.react';
import Image from 'next/image'

import LOGO from './../assets/logo.png'

export default function Home() {
    const router = useRouter()
    const hash = router.asPath.substring(1,router.asPath.length)


    const [qrCode, setQRCode]     = useState('')
    const [loading, setLoading]   = useState(true)
    const [error404, setError404] = useState(false)

   
    return (
        <>
            {loading ? 
                <div style={{display:"flex",justifyContent:"center", alignItems:"center", height:"100vh"}}>
                    <i className='fa fa-spinner fa-spin' style={{fontSize:"28px"}}/>
                </div>
            :   error404 ? 
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"89vh"}}>
                        <div>
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <span style={{fontSize:"48px", fontWeight:"bold"}}>404</span>
                                <span style={{fontSize:"28px", fontWeight:"bold"}}>Página não encontrada</span>
                            </div>
                            <div style={{marginTop:"35px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Image src={LOGO} alt="logo" style={{width:"215px", height:"75px"}}/>
                            </div>
                        </div>
                    </div>
                :
                    <div className='containt'>
                        <div style={{display:"flex",alignItems:"flex-start", flexDirection:"column", width:"50%"}}>

                        </div>
                        <div style={{display:"flex",alignItems:"center", flexDirection:"column", width:"50%"}}>
                            <div className='qrcode'>
                                <QRCode value={qrCode} />
                            </div>
                            <div style={{color:"#fff", display:"flex", flexDirection:"column", marginTop:"50px", alignItems:"center",justifyContent:"center"}}>
                                <span style={{fontSize:"36px"}}>Escaneie aqui o QRCode</span>
                                <span style={{fontSize:"22px", textAlign:"center", marginTop:"15px", width:"80%"}}>Evite filas, aponte o seu celular para o QRCode, e escaneie nossa ficha cadastral.</span>
                            </div>
                            <div className='footer'>
                                <Image src={LOGO} alt="logo" className='logo-qrcode'/>
                            </div>
                        </div>
                    </div>
                }
        </>
    )
}
