import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header(): JSX.Element {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });
  return (
    <header className={styles.container}>
      <img src="/img/logo.svg" alt="logo" />
      <p>O mellhor para você ouvir, sempre</p>
      <span className="text-gray-400">{currentDate}</span>
    </header>
  );
}
