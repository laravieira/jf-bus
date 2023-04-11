import PageContainer from '../../../components/PageContainer';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import Line from '../../../components/Line';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { Card as CardModel } from '../../../models/Card.model';

type RechargeProps = {
  value: number|null,
  setValue: (value: number|null) => void,
  create: () => void,
  cards: CardModel[],
  loading: boolean
}

function Recharge(props: RechargeProps) {
  const { value, setValue, create, cards, loading } = props;

  function renderHeader(text: string) {
    return <View>
      <Text.H3>{ text }</Text.H3>
      <Line style={styles.line}/>
    </View>;
  }

  function renderValueInput() {
    return <InputField.Money
      value={ value }
      onType={ setValue }
      placeholder="R$: 3.10"
      style={styles.space}
    />;
  }

  function renderButton() {
    return <Button onPress={create} style={styles.space}>Create</Button>;
  }

  function renderCard(card: CardModel, key: number) {
    return <Card card={card} key={key}/>;
  }

  return <PageContainer.Scroll>
    { renderHeader('Recharge') }
    { renderValueInput() }
    { renderButton() }
    { renderHeader(`Card${cards.length?'s':''}`) }
    { cards.map(renderCard) }
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  line: {
    marginTop: 8
  },
  space: {
    marginTop: 24
  }
});

export default Recharge;