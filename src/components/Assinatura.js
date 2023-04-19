import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import SignatureCanvas from 'react-signature-canvas';
import LOGO from './../assets/logo.png'

const Assinatura = () => {
    const [loading, setLoading] = useState(false)

    const canvasRef = useRef(null);

    const clearSignature = (e) => {
        canvasRef.current.clear();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        clearSignature()

    }

    return (
        <>
            <div className='box-signature'>
                <div style={{ textAlign: "center" }}>
                    <Image src={LOGO} alt="logo" className='logo-register' />
                </div>
                <div style={{ border: "1px dashed #cacaca", borderRadius: "5px", width: "100%", height: "66vh", padding: "5px", marginTop: "15px" }}>
                    <SignatureCanvas ref={canvasRef} canvasProps={{ className: 'board-signature' }} />
                </div>
                <div style={{ display: "flex", gap: "5px", marginTop: "15px" }}>
                    <button className='btn btn-secondary' type="button" disabled={loading} onClick={e => clearSignature()}><i className='fa fa-eraser' /> Limpar Assinatura</button>
                    <button className='btn btn-primary' type="button" disabled={loading} onClick={e => handleSubmit(e)} style={{ width: "140px" }}><i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-circle-right'}`} /> Avançar</button>
                </div>
            </div>
        </>
    );
}


export default Assinatura;