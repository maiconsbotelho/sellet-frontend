import { useEffect, useState } from 'react'
import useAPI from './useAPI'
import useSessao from './useSessao'
import { useRouter, useSearchParams } from 'next/navigation'

export default function useFormAuth() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCPF] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [uf, setUf] = useState('')
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')

    const { httpPost } = useAPI()
    const { usuario, iniciarSessao } = useSessao()

    const router = useRouter()
    const param = useSearchParams()

    useEffect(() => {
        if (usuario?.email) {
            const destino = param.get('destino') as string
            router.push(destino ? destino : '/')
        }
    }, [usuario, router, param])

    function alterarModo() {
        setModo(modo === 'login' ? 'cadastro' : 'login')
    }

    async function submeter() {
        if (modo === 'login') {
            await login()
        } else {
            await registrar()
            await login()
        }
        limparFormulario()
    }

    async function login() {
        const token = await httpPost('auth/login', { email, senha })
        iniciarSessao(token)
    }

    async function registrar() {
        await httpPost('auth/registrar', { nome, email, senha, cpf, telefone, cep, uf, cidade, bairro, rua, numero })
    }

    function limparFormulario() {
        setNome('')
        setEmail('')
        setSenha('')
        setCPF('')
        setTelefone('')
        setCep('')
        setUf('')
        setCidade('')
        setBairro('')
        setRua('')
        setNumero('')
        setModo('login')
    }

    return {
        modo,
        nome,
        email,
        senha,
        cpf,
        telefone,
        cep,
        uf,
        cidade,
        bairro,
        rua,
        numero,
        alterarNome: setNome,
        alterarEmail: setEmail,
        alterarSenha: setSenha,
        alterarCPF: setCPF,
        alterarTelefone: setTelefone,
        alterarCep: setCep,
        alterarUf: setUf,
        alterarCidade: setCidade,
        alterarBairro: setBairro,
        alterarRua: setRua,
        alterarNumero: setNumero,
        alterarModo,
        submeter,
    }
}
