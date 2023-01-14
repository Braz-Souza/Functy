import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import IDFound from './Components/ID/IDFound';
import IDNotFound from './Components/ID/IDNotFound';
import LoadingScreen from './Components/LoadingScreen';
import { useEffect, useState } from 'react';

function SearchId() {
  const { functyId } = useParams();
  let [found, setFound] = useState(null);
  let [functy, setFuncty] = useState(null);

  useEffect(() => {
    const searchID = async () => {
      const docRef = doc(firestore, 'functions', functyId);
      const docSnap = await getDoc(docRef);
      setFound(docSnap.exists());
      setFuncty(docSnap.data());
    };

    searchID().catch(console.error);
  }, [functyId]);

  if (found === null) return <LoadingScreen />;

  return found ? <IDFound {...functy} /> : <IDNotFound />;
}

export default SearchId;
