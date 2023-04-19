import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import LOGO from './../assets/logo.png'

export default function Error404() {
    return(
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
    )
}