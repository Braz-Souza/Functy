import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function LoadingScreen() {
  return (
    <div className='loading-screen'>
      <Logo className='loading-spinner' />
    </div>
  );
}
