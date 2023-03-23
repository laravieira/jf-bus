import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';

function Home() {
  const card = {
    user: 'Lara Vieira de Menezes',
    type: 231,
    code: '59.20.00021735-2',
    active: true
  };

  return <PageContainer>
    <Card data={card} />
  </PageContainer>;
}

export default Home;