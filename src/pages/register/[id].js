import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import Image from 'next/image'
import { useRouter } from 'next/router'
import SignatureCanvas from 'react-signature-canvas';
import Swal from 'sweetalert2'
import LOGO from './../../assets/logo.png'

import cep from 'cep-promise';

import { api } from './../../services/api'

import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';

export default function Home() {
    const router = useRouter()
    const hash = router.asPath.substring(1,router.asPath.length).split('/')[1]

    const [error404, setError404]           = useState(false)

    const [loading, setLoading]             = useState(false)
    const [CPFCNPJ, setCPFCNPJ]             = useState('')
    const [name, setName]                   = useState('')
    const [birthDate, setBirthDate]         = useState('')
    const [RG, setRG]                       = useState('')
    const [issue, setIssue]                 = useState('')
    const [UFIssue, setUFIssue]             = useState('')
    const [naturalness, setNaturalness]     = useState(0)
    const [maritalStatus, setMaritalStatus] = useState('')
    const [CEP, setCEP]                     = useState('')
    const [address, setAddress]             = useState('')
    const [number, setNumber]               = useState('')
    const [complement, setComplement]       = useState('')
    const [neighborhood, setNeighborhood]   = useState('')
    const [city, setCity]                   = useState('')
    const [UF, setUF]                       = useState('')
    const [phone, setPhone]                 = useState('')
    const [whatsapp, setWhatsapp]           = useState('')
    const [email, setEmail]                 = useState('')
    const [step, setStep]                   = useState(0)

    const canvasRef = useRef(null);
    
    const handleCEP = async(value) => {
        setCEP(value)
        try {
            if (value.replace(/\D/g, '').length === 8) {
                let _data = await cep(value);
                console.log(_data)
                setAddress(_data.street || '')
                setNeighborhood(_data.neighborhood || '')
                setCity(_data.city || '')
                setUF(_data.state || '')
            }
        } catch(e) {
            setAddress('')
            setNeighborhood('')
            setCity( '')
            setUF('') 
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        setLoading(true)
        if (step === 0) {
            setStep(1)             
            setLoading(false)
        }
        


        if (step === 1) {
            setStep(2) 
            setLoading(false)
        }

        if (step === 2) {
            setStep(3) 
            setLoading(false)

        }

        if (step === 3) {
                Swal.fire({
                    title: 'OK',
                    icon:"success",
                    text:"Seu cadastro foi realizado com sucesso!",
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            
            setTimeout(() => {
                window.location.href = 'https://www.coalumaq.com.br/'
            },5000)
            
        }
    }

    const clearSignature = (e) => {
        canvasRef.current.clear();
    };

    const handleDocumentoChange = (event) => {
        const input = event.target.value.replace(/\D/g, ''); 
        let newMask;
    
        if (input.length <= 11) 
            newMask = '999.999.999-99';
        else 
            newMask = '99.999.999/9999-99';
            
        let newValue = '';
        let index = 0;
        for (let i = 0; i < newMask.length && index < input.length; i++) {
          if (newMask[i] === '9') {
            newValue += input[index];
            index++;
          } else {
            newValue += newMask[i];
          }
        }
    
        setCPFCNPJ(newValue);
    };

    useEffect(() => {
        if (step === 2) {
            Swal.fire({
                title: 'Atenção',
                icon:"warning",
                text:"Este e o momento que precisamos obter a sua assinatura, para uma melhor captura, vire o seu telefone na horizontal.",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
    },[step])

    return (
        <>
            { error404 ? 
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
                <div style={{justifyContent:"center"}} className={`containt-register ${step === 0 ? 'alg-center' : step === 1 || step === 3? 'containt-infinite' : ''}`}>
                    {step === 0 ?
                        <div className='box-search-register'>
                            <div style={{textAlign:"center"}}>
                                <Image src={LOGO} alt="logo" className='logo-register'/>
                            </div>
                            <div style={{marginTop:"20px"}}>
                                <ValidationForm onSubmit={handleSubmit} setFocusOnError={false}> 
                                    <div>
                                        <span>Informe o CPF ou CNPJ</span>
                                        <TextInput 
                                            name="CPFCNPJ"
                                            id="CPFCNPJ"
                                            type="text"
                                            placeholder="CPF ou CNPJ"
                                            required
                                            autoFocus
                                            errorMessage={{ required: "Por favor, informe um CPF ou CNPJ válido!"}}
                                            value={CPFCNPJ}
                                            className="form-control "
                                            onChange={e => handleDocumentoChange(e)}
                                            autoComplete="off"
                                                        />
                                    </div>
                                    <div style={{marginTop:"10px"}}>
                                        <button type="submit" className='btn btn-primary' style={{width:"100%"}} disabled={loading}><i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-search'}`}/> Pesquisar</button>
                                    </div>
                                </ValidationForm>
                            </div>
                        </div>
                    : ''}
                    {step === 1 ? 
                        <div className='box-register'>
                        <div style={{textAlign:"center"}}>
                            <Image src={LOGO} alt="logo" className='logo-register'/>
                        </div>
                        <div style={{marginTop:"20px"}}>
                            <ValidationForm onSubmit={handleSubmit} setFocusOnError={false}> 
                                <div>
                                    <span>{CPFCNPJ.length <= 14 ? 'CPF' : 'CNPJ'}</span>
                                    <TextInput 
                                        name="CPFCNPJ"
                                        id="CPFCNPJ"
                                        type="text"
                                        disabled
                                        placeholder="CPF"
                                        value={CPFCNPJ}
                                        className="form-control "
                                        autoComplete="off"
                                                    />
                                </div>
                                <div>
                                    <span>{CPFCNPJ.length <= 14 ? 'Nome Completo' : 'Razão Social'}</span>
                                    <TextInput 
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder={CPFCNPJ.length <= 14 ? 'Nome Completo' : 'Razão Social'}
                                        required
                                        maxLength={60}
                                        errorMessage={{ required: "Por favor, informe seu nome!"}}
                                        value={name}
                                        autoFocus
                                        onChange={e => setName(e.target.value.toString().toUpperCase())}
                                        className="form-control "
                                        autoComplete="off"
                                                    />
                                </div>
                                {CPFCNPJ.length <= 14 ? 
                                    <div>
                                        <span>Data de Nascimento</span>
                                        <TextInput 
                                            name="birthdate"
                                            id="birthdate"
                                            type="date"
                                            required
                                            onChange={e => setBirthDate(e.target.value)}
                                            errorMessage={{ required: "Por favor, informe seu nascimento!"}}
                                            value={birthDate}
                                            className="form-control "
                                            autoComplete="off"
                                        />
                                    </div>
                                : ''}

                                <div>
                                    <span>{CPFCNPJ.length <= 14 ? 'RG' : 'Inscrição Estadual'}</span>
                                    <TextInput 
                                        name="rg"
                                        id="rg"
                                        type="text"
                                        placeholder={CPFCNPJ.length <= 14 ? 'RG' : 'Inscrição Estadual'}
                                        value={RG}
                                        maxLength={20}
                                        className="form-control "
                                        onChange={e => setRG(e.target.value)}
                                        autoComplete="off"
                                                    />
                                </div>
                                {CPFCNPJ.length <= 14 ? 
                                    <>
                                        <div style={{display:"flex"}}>
                                            <div style={{width:"100%"}}>
                                                <span>Emissor</span>
                                                <TextInput 
                                                    name="issue"
                                                    id="issue"
                                                    type="text"
                                                    maxLength={5}
                                                    placeholder="Emissor"
                                                    value={issue}
                                                    onChange={e => setIssue(e.target.value)}
                                                    className="form-control "
                                                    autoComplete="off"
                                                            />
                                            </div>
                                            <div style={{width:"125px", marginLeft:"10px"}}>
                                                <span>UF</span>
                                                <select 
                                                    name="UFIssue"
                                                    id="UFIssue"
                                                    type="text"
                                                    onChange={e => setUFIssue(e.target.value)}
                                                    value={UFIssue}
                                                    className="form-select "
                                                    autoComplete="off"
                                                                >
                                                    <option value=''>Selecione</option>
                                                    <option value='AC'>AC</option>
                                                    <option value='AL'>AL</option>
                                                    <option value='AM'>AM</option>
                                                    <option value='AP'>AP</option>
                                                    <option value='BA'>BA</option>
                                                    <option value='CE'>CE</option>
                                                    <option value='DF'>DF</option>
                                                    <option value='ES'>ES</option>
                                                    <option value='GO'>GO</option>
                                                    <option value='MA'>MA</option>
                                                    <option value='MG'>MG</option>
                                                    <option value='MS'>MS</option>
                                                    <option value='MT'>MT</option>
                                                    <option value='PA'>PA</option>
                                                    <option value='PB'>PB</option>
                                                    <option value='PE'>PE</option>
                                                    <option value='PI'>PI</option>
                                                    <option value='PR'>PR</option>
                                                    <option value='RJ'>RJ</option>
                                                    <option value='RN'>RN</option>
                                                    <option value='RO'>RO</option>
                                                    <option value='RR'>RR</option>
                                                    <option value='RS'>RS</option>
                                                    <option value='SC'>SC</option>
                                                    <option value='SE'>SE</option>
                                                    <option value='SP'>SP</option>
                                                    <option value='TO'>TO</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <span>Naturalidade</span>
                                            <TextInput 
                                                name="naturalness"
                                                id="naturalness"
                                                type="text"
                                                placeholder="Naturalidade"
                                                value={naturalness}
                                                onChange={e => setNaturalness(e.target.value)}
                                                className="form-control "
                                                autoComplete="off"/>
                                        </div>
                                        <div>
                                            <span>Estado Civil</span>
                                            <select 
                                                name="maritalStatus"
                                                id="maritalStatus"
                                                onChange={e => setMaritalStatus(e.target.value)}
                                                value={maritalStatus}
                                                className="form-select "
                                                autoComplete="off"
                                                        >
                                                <option value=''>Selecione</option>
                                                <option value='0'>Solteiro</option>
                                                <option value='1'>Casado</option>
                                                <option value='2'>Divorciado</option>
                                                <option value='3'>Viuvo</option>
                                            </select>
                                        </div>
                                    </>
                                : ''}
                                <div>
                                    <span>CEP</span>
                                    <InputMask 
                                        name="CEP"
                                        id="CEP"
                                        type="text"
                                        placeholder="CEP"
                                        value={CEP}
                                        errorMessage={{ required: "Por favor, informe seu CEP!"}}
                                        required
                                        mask={'99.999-999'}
                                        onChange={e => handleCEP(e.target.value)}
                                        className="form-control "
                                        autoComplete="off"
                                                        />
                                </div>  
                                <div>
                                    <span>Endereço</span>
                                    <TextInput 
                                        name="address"
                                        id="address"
                                        type="text"
                                        errorMessage={{ required: "Por favor, informe seu endereço!"}}
                                        required
                                        placeholder="Endereço"
                                        onChange={e => setAddress(e.target.value)}
                                        value={address}
                                        className="form-control "
                                        autoComplete="off"
                                                    />
                                </div>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"125px"}}>
                                        <span>Número</span>
                                        <TextInput 
                                            name="number"
                                            id="number"
                                            type="text"
                                            placeholder="Nº"
                                            onChange={e => setNumber(e.target.value)}
                                            value={number}
                                            maxLength={10}
                                            className="form-control "
                                            autoComplete="off"
                                                            />
                                    </div>
                                    <div style={{marginLeft:"10px"}}>
                                        <span>Complemento</span>
                                        <TextInput 
                                            name="complement"
                                            id="complement"
                                            type="text"
                                            placeholder="Complemento"
                                            value={complement}
                                            onChange={e => setComplement(e.target.value)}
                                            className="form-control "
                                            autoComplete="off"
                                                            />
                                    </div>
                                </div>
                                <div>
                                    <span>Bairro</span>
                                    <TextInput 
                                        name="neighborhood"
                                        id="neighborhood"
                                        onChange={e => setNeighborhood(e.target.value)}
                                        type="text"
                                        required
                                        errorMessage={{ required: "Por favor, informe o seu bairro!"}}
                                        placeholder="Bairro"
                                        value={neighborhood}
                                        className="form-control "
                                        autoComplete="off"
                                                        />
                                </div>
                                <div style={{display:"flex"}}>
                                    <div style={{width:"100%"}}>
                                        <span>Cidade</span>
                                        <TextInput 
                                            name="city"
                                            id="city"
                                            type="text"
                                            placeholder="Cidade"
                                            value={city}
                                            required
                                            errorMessage={{ required: "Por favor, informe a sua cidade!"}}
                                            onChange={e => setCity(e.target.value)}
                                            className="form-control "
                                            autoComplete="off"
                                                    />
                                    </div>
                                    <div style={{marginLeft:"10px", width:"100px"}}>
                                        <span>UF</span>
                                        <select 
                                            id='uf'
                                            name='uf'
                                            value={UF}
                                            required
                                            errorMessage={{ required: "Por favor, informe seu estado!"}}
                                            onChange={e => setUF(e.target.value)}
                                            className="form-select ">
                                                <option value=''>Selecione</option>
                                                <option value='AC'>AC</option>
                                                <option value='AL'>AL</option>
                                                <option value='AM'>AM</option>
                                                <option value='AP'>AP</option>
                                                <option value='BA'>BA</option>
                                                <option value='CE'>CE</option>
                                                <option value='DF'>DF</option>
                                                <option value='ES'>ES</option>
                                                <option value='GO'>GO</option>
                                                <option value='MA'>MA</option>
                                                <option value='MG'>MG</option>
                                                <option value='MS'>MS</option>
                                                <option value='MT'>MT</option>
                                                <option value='PA'>PA</option>
                                                <option value='PB'>PB</option>
                                                <option value='PE'>PE</option>
                                                <option value='PI'>PI</option>
                                                <option value='PR'>PR</option>
                                                <option value='RJ'>RJ</option>
                                                <option value='RN'>RN</option>
                                                <option value='RO'>RO</option>
                                                <option value='RR'>RR</option>
                                                <option value='RS'>RS</option>
                                                <option value='SC'>SC</option>
                                                <option value='SE'>SE</option>
                                                <option value='SP'>SP</option>
                                                <option value='TO'>TO</option>
                                            </select>
                                    </div>
                                </div>
                                <div>
                                    <span>Telefone</span>
                                    <InputMask 
                                        name="phone"
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        mask="(99) 9999-9999"
                                        onChange={e => setPhone(e.target.value)}
                                        className="form-control "
                                        autoComplete="off"
                                                        />
                                </div>
                                <div>
                                    <span>Celular | Whatsapp</span>
                                    <InputMask 
                                        name="whatsapp"
                                        id="whatsapp"
                                        type="text"
                                        placeholder="Whatsapp"
                                        value={whatsapp}
                                        required
                                        errorMessage={{ required: "Por favor, informe o seu whatsapp!"}}
                                        mask="(99) 99999-9999"
                                        onChange={e => setWhatsapp(e.target.value)}
                                        className="form-control "
                                        autoComplete="off"
                                                        />
                                </div>
                                <div>
                                    <span>Email</span>
                                    <TextInput 
                                        name="email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="form-control "
                                        autoComplete="off"
                                                        />
                                </div> 
                                <div style={{marginTop:"10px"}}>
                                    <button type="submit" className='btn btn-primary' style={{width:"100%"}} disabled={loading}><i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-circle-right'}`}/> Avançar</button>
                                </div>

                            </ValidationForm>
                        </div>
                    </div>
                    : ""}
                    {step === 2 ?
                        <div className='box-signature'>
                        <div style={{textAlign:"center"}}>
                            <Image src={LOGO} alt="logo" className='logo-register'/>
                        </div>
                        <div style={{border:"1px dashed #cacaca", borderRadius:"5px", width:"100%", height:"66%", padding:"5px", marginTop:"15px"}}>
                            <SignatureCanvas ref={canvasRef} canvasProps={{ className: 'board-signature' }} />
                        </div>
                        <div style={{display:"flex",gap:"5px", marginTop:"15px"}}>
                            <button className='btn btn-secondary' type="button" disabled={loading} onClick={e => clearSignature()}><i className='fa fa-eraser'/> Limpar Assinatura</button>
                            <button className='btn btn-primary' type="button"   disabled={loading} onClick={e => handleSubmit(e)} style={{width:"140px"}}><i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-circle-right'}`}/> Avançar</button>
                        </div>
                        </div>
                    : ""}
                    {step === 3 ?
                        <div className='box-terms'>
                        <div style={{textAlign:"center"}}>
                            <Image src={LOGO} alt="logo" className='logo-register'/>
                        </div>
                        <div className='div-terms' style={{marginTop:"15px"}}>
                            <div  style={{fontWeight:"bold",textAlign:"center", marginBottom:"15px"}}>
                                <span>TERMO DE CIÊNCIA</span>
                            </div>
                            
                            <p>Declaro que as informações acima são verdadeiras e de minha responsabilidade.</p>
                            <p>Declaro estar de acordo com a descrição de venda, orçamento e serviço.</p>
                            <p>Dou ciência que, o atendimento de garantias, caso haja, ocorrerá somente de segunda à sexta feira, entendendo que não competirá a sábados, domingos e feriados. A realização desta dependerá da apresentação da Nota Fiscal referênte ao produto/serviço adquirido, sendo está última a respeitar o tempo de garantia pelo produto/serviço prestado.</p>
                            <p>Declaro ter ciência do horário de abertura e fechamento desta loja, como sendo de segunda a sexta feira das 08h às 18h e sábado das 8h às 13hs, (para atendimento de garantia, das 08h as 17h nos dias conseguintes denunciados acima), e que, havendo a não conclusão do serviço adquirido na data da compra, este será remanejado para o dia posterior, afim de concluir o serviço adquirido, para mais informações, consulte o tempo previsto para conclusão/entrega do mesmo.</p>
                            <p>Declaro estar de acordo que a não conclusão do serviço de instalação, dentro do horário de funcionamento desta loja resultará na obrigatoriedade de permanência do veículo/produto dentro desta, até a conclusão do mesmo, afim de se respaldar sua garantia e qualidade. Ademais, entende que a não concordância deste último, poderá comprometer a garantia desde.</p>
                            <p>Declaro ciência e plena concordância da proibição de minha permanência no setor de instalação, afm de se assegurar minha segurança e a qualidade do processo do mesmo serviço a ser executado.</p>
                            <p>Declaro estar de comum acordo, bem como autorizar afixação de nosso controle de garantia e qualidade, na traseira, dianteira ou esquerda do mesmo veículo, além de comprometer-me pela não retirada desde, (pelo determinando comumente tempo de garantia do produto e/ou serviço contrato), afim de assegurar sua objetivação, frente.</p>

                            <div style={{marginTop:"15px"}}>
                                <button type="button" className='btn btn-success' onClick={e => handleSubmit(e)}><i className='fa fa-save'></i> Aceitar os Termos e Finalizar</button>
                            </div>
                        </div>
                        </div>
                    : ""}
                </div>
            }
        </>
    )
}
