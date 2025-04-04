import Image from 'next/image'
import Link from 'next/link'

export default function AgendadoComSucesso() {
    return (
        <div className="flex flex-col items-center">
            
            <h2 className="text-3xl font-black">Iradoooo! Tudo marcado!</h2>
            <h3 className="text-zinc-400 text-lg font-thin w-96 text-center">
                Tudo certo por aqui! Seu horário está garantido e agora é só aguardar para brilhar!
            </h3>
            <Link href="/" className="button mt-7 bg-green-600">
                Voltar para o Início
            </Link>
        </div>
    )
}
