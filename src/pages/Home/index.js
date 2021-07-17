import React,{ useState } from 'react';
import * as S from './styled';
import axios from 'axios';
import {useHistory} from 'react-router-dom'



export default function Home(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);
  
  function handlePesquisa(){
      axios.get(`https://api.github.com/users/${usuario}/repos`)
        .then( res => {
          const repositories = res.data;
          const repositoriesName= []
          repositories.map(repository =>
            repositoriesName.push(repository.name)
          )
          localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
          setErro(false);
          history.push('/repositories');
        })
        .catch(err => {
          setErro(true);
        });
  }
  return (
    <S.HomeContainer>
    <S.Content>
      <S.Input className='usuarioS.Input' placeholder='Usuário aqui' value={usuario} onChange={e => setUsuario(e.target.value)} />
      <S.Button onClick={handlePesquisa} >Pesquisar</S.Button>
    </S.Content>
    {erro ? <S.ErrorMsg>Usuário não encontrado</S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}
