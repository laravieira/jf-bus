import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';

const LINK_LARAVIEIRA = 'https://laravieira.me';
const LINK_GITHUB = 'https://github.com/laravieira/BusCard';
const LINK_FLATICON = 'https://www.flaticon.com/free-icons/buses';
const LINK_BILHETEUNICO = 'http://www.bilheteunicojf.com.br';
const LINK_TOWNHALL = 'https://www.pjf.mg.gov.br/onibus/itinerario/';

function About() {
  return <PageContainer.Scroll>
    <Header>JF Bus</Header>
    <Text>JF Bus is a non official application, open-source, non-profitable, made and maintained by <Text.Link url={ LINK_LARAVIEIRA }>Lara Vieira</Text.Link>.</Text>
    <Text style={ styles.text }>The process of login and recharging your Bilhete Único is all handled by PRODATA.</Text>
    <Text style={ styles.text }>This application communicate with PRODATA using web scraping methods.</Text>
    <Text style={ styles.text }>JF Bus neither Lara Vieira has any partnership with PRODATA or Juiz de Fora hall town.</Text>

    <Header style={ styles.header }>Source code</Header>
    <Text.Link url={ LINK_GITHUB }>{ LINK_GITHUB }</Text.Link>

    <Header style={ styles.header }>Credits</Header>
    <Text>Bus Logo:</Text>
    <Text.Link url={ LINK_FLATICON }>{ LINK_FLATICON }</Text.Link>
    <Text style={ styles.text }>Bilhete Único:</Text>
    <Text.Link url={ LINK_BILHETEUNICO }>{ LINK_BILHETEUNICO }</Text.Link>
    <Text style={ styles.text }>Horário de ônibus:</Text>
    <Text.Link url={ LINK_TOWNHALL }>{ LINK_TOWNHALL }</Text.Link>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  header: {
    marginTop: 48
  },
  text: {
    marginTop: 24
  }
});

export default About;