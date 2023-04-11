import PageContainer from '../../../components/PageContainer';
import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { Card as CardModel } from '../../../models/Card.model';
import Header from '../../../components/Header';

type RechargeProps = {
  value: number|null,
  setValue: (value: number|null) => void,
  create: () => void,
  cards: CardModel[],
  loading: boolean
}

function Recharge(props: RechargeProps) {
  const { value, setValue, create, cards, loading } = props;

  function renderValueInput() {
    return <View style={styles.input}>
      <Text.H5>Value</Text.H5>
      <InputField.Money
        value={ value }
        onType={ setValue }
        placeholder="R$: 3.10"
      />
    </View>;
  }

  function renderButton() {
    return <Button
      onPress={create}
      disabled={loading}
      style={styles.button}>
      Create Recharge
    </Button>;
  }

  function renderCard(card: CardModel, key: number) {
    return <Card card={card} key={key}/>;
  }

  return <PageContainer.Scroll>
    <Header>Recharge Card</Header>
    { renderValueInput() }
    { renderButton() }
    <Header>
      { `Card${cards.length > 1?'s':''}` }
    </Header>
    <View style={styles.cards}>
      { cards.map(renderCard) }
    </View>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 32,
    gap: 8
  },
  button: {
    marginBottom: 48
  },
  cards: {
    marginBottom: 32,
    gap: 24
  }
});

export default Recharge;