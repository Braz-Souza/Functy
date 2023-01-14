import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IDNotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='functy-form'>
        <h1>Wrong Link!</h1>
        <p>Sorry, no function was found.</p>
        <p>
          <i>Please, check if the link you wrote was right.</i>
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='go-back'
          onClick={() => navigate('/')}
        >
          Go Back
        </motion.button>
      </div>
    </div>
  );
}
