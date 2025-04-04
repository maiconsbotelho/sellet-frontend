import ItemProfissional from './ItemProfissional'
import TituloSecao from '../shared/TituloSecao'
import useProfissionais from '../../data/hooks/useProfissionais'

export default function NossosProfissionais() {
    const { profissionais } = useProfissionais()
    return (
      <div className="flex flex-col  gap-y-16">
        <TituloSecao
          tag="Time"
          principal="Nossas Especialistas"
          secundario="só as melhores estão aqui! Temos o orgulho de contar com a equipe mais qualificada do Brasil!"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {profissionais.map((profissional) => (
            <ItemProfissional
              key={profissional.id}
              profissional={profissional}
            />
          ))}
        </div>
      </div>
    ); 
}
