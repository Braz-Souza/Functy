import { useState, useRef } from 'react';
import { firestore } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal/modal';
import CodeEditor from '@uiw/react-textarea-code-editor';

const exts = [
  'abap',
  'aes',
  'apex',
  'azcli',
  'bat',
  'bicep',
  'brainfuck',
  'c',
  'cameligo',
  'clike',
  'clojure',
  'coffeescript',
  'cpp',
  'csharp',
  'csp',
  'css',
  'dart',
  'dockerfile',
  'ecl',
  'elixir',
  'erlang',
  'flow9',
  'freemarker2',
  'fsharp',
  'go',
  'graphql',
  'hcl',
  'html',
  'ini',
  'java',
  'javascript',
  'json',
  'jsx',
  'julia',
  'kotlin',
  'less',
  'lex',
  'lexon',
  'liquid',
  'livescript',
  'lua',
  'm3',
  'markdown',
  'mips',
  'msdax',
  'mysql',
  'nginx',
  'objective-c',
  'pascal',
  'pascaligo',
  'perl',
  'pgsql',
  'php',
  'pla',
  'plaintext',
  'postiats',
  'powerquery',
  'powershell',
  'proto',
  'pug',
  'python',
  'qsharp',
  'r',
  'razor',
  'redis',
  'redshift',
  'redstructuredtext',
  'ruby',
  'rust',
  'sb',
  'scala',
  'scheme',
  'scss',
  'shell',
  'sol',
  'sparql',
  'sql',
  'st',
  'stylus',
  'swift',
  'systemverilog',
  'tcl',
  'toml',
  'tsx',
  'twig',
  'typescript',
  'vb',
  'vbscript',
  'verilog',
  'vue',
  'xml',
  'yaml',
];

function generateRandomLink() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;

  // fix bug:
  // If the random link is already in the database, generate a new one
}

function titlePurifier(title) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < title.length; i++) {
    if (title[i] === '(') break;
    if (title[i] === '.') break;
    if (characters.includes(title[i])) result += title[i];
  }
  return result.length >= 3 ? result : null;
}

const functionAlreadyExists = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

const saveFunction = async (title, functy, language, link) => {
  const createdAt = Date.now();

  const ref = doc(firestore, 'functions', link);
  let data = { title, functy, language, createdAt, link };

  if (await functionAlreadyExists(ref)) return null;

  try {
    setDoc(ref, data);
  } catch (error) {
    console.log(error);
  }

  return data.link;
};

function InputFunctionTitle({ titleRef }) {
  return (
    <input
      className='functy-input'
      type='text'
      ref={titleRef}
      placeholder='Insert title'
      maxlength='20'
    />
  );
}

function CodeInput({ functionRef, code, setCode, lang }) {
  return (
    <div className='functy-input-code'>
      <CodeEditor
        value={code}
        language={lang}
        className='functy-code-editor'
        placeholder='Please enter your code.'
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 24,
          backgroundColor: '#101010',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        ref={functionRef}
        required
      />
    </div>
  );
}

function SaveButton({ loading }) {
  function NotLoadingButton() {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='save-button'
      >
        Save
      </motion.button>
    );
  }

  function LoadingButton() {
    return (
      <motion.button className='save-button' disabled>
        Loading...
      </motion.button>
    );
  }

  return loading ? <LoadingButton /> : <NotLoadingButton />;
}

function ModalGerarFuncty({
  modalOpen,
  setModalOpen,
  createFunction,
  title,
  titleAlreadyInDb,
}) {
  function RandomLinkBtn() {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='modal-button-random-link-generate'
        onClick={() => {
          setModalOpen(false);
          createFunction(generateRandomLink());
        }}
      >
        Random Link
      </motion.button>
    );
  }

  function TitleBtn() {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='modal-button-random-link-generate'
        onClick={() => {
          setModalOpen(false);
          createFunction(titlePurifier(title));
        }}
      >
        Use Title as Link
      </motion.button>
    );
  }

  return (
    modalOpen && (
      <Modal
        modalOpen={modalOpen}
        title={'Generate your link!'}
        text={<></>}
        handleClose={() => {
          setModalOpen(false);
        }}
      >
        <motion.div className='functy-create-options'>
          <RandomLinkBtn />
          {titleAlreadyInDb || <TitleBtn />}
        </motion.div>
      </Modal>
    )
  );
}

function URLModal({ modalURLOpen, setModalURLOpen, URL }) {
  function CloseButton() {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='modal-close-button'
        onClick={() => setModalURLOpen(null)}
      >
        Close
      </motion.button>
    );
  }

  function GeneratedLink({ url }) {
    return (
      <Link to={url} className='generated-link'>
        {url && `http://localhost:3000/${url}`}
      </Link>
    );
  }

  return (
    modalURLOpen && (
      <Modal
        modalOpen={URL}
        title={'Your function is ready!'}
        text={<GeneratedLink url={URL} />}
        handleClose={() => setModalURLOpen(null)}
      >
        <CloseButton />
      </Modal>
    )
  );
}

function LangSelector({ lang, setLang }) {
  return (
    <select
      className='functy-lang-selector'
      value={lang}
      onChange={(evn) => setLang(evn.target.value)}
    >
      {exts.map((keyName, idx) => {
        if (/^diff/.test(keyName)) return null;
        if (keyName === 'python')
          return (
            <option selected key={idx} value={keyName}>
              Language: {keyName}
            </option>
          );
        return (
          <option key={idx} value={keyName}>
            Language: {keyName}
          </option>
        );
      })}
    </select>
  );
}

function Root() {
  const titleRef = useRef();
  const functionRef = useRef();

  const [URL, setURL] = useState(null);
  const [loadingURL, setLoadingURL] = useState(false);
  const [modalURLOpen, setModalURLOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleAlreadyInDb, setTitleAlreadyInDb] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');

  const createFunction = async (link) => {
    setLoadingURL(true);
    let title = titleRef.current.value;
    let functy = functionRef.current.value;
    let url = await saveFunction(title, functy, language, link);
    setURL(url);
    setModalURLOpen(true);
    setLoadingURL(false);
  };

  const handleDisplayModal = async (e) => {
    e.preventDefault();
    let title = titleRef.current.value;
    title = titlePurifier(title);
    if (title === null) {
      setTitleAlreadyInDb(true);
      setModalOpen(true);
    }
    let docRef = doc(firestore, 'functions', title);
    let titleInDb = await functionAlreadyExists(docRef);
    setTitleAlreadyInDb(titleInDb);
    setModalOpen(true);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>
        <a
          rel='noreferrer'
          href='https://github.com/Braz-Souza/Functy'
          target='_blank'
        >
          functy.me
        </a>
      </h1>
      <form className='functy-form' onSubmit={handleDisplayModal}>
        <div className='functy-title-lang'>
          <InputFunctionTitle titleRef={titleRef} />
          <LangSelector lang={language} setLang={setLanguage} />
        </div>
        <CodeInput
          functionRef={functionRef}
          code={code}
          setCode={setCode}
          lang={language}
        />
        <SaveButton loading={loadingURL || modalOpen} />
      </form>
      <AnimatePresence initial={false} wait={true} onExitComplete={() => {}}>
        <URLModal
          modalURLOpen={modalURLOpen}
          setModalURLOpen={setModalURLOpen}
          URL={URL}
        />
        <ModalGerarFuncty
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          createFunction={createFunction}
          title={titleRef.current ? titleRef.current.value : ''}
          titleAlreadyInDb={titleAlreadyInDb}
        />
      </AnimatePresence>
    </div>
  );
}

export default Root;

// FIX BUG:
// react framer motion:
// Modal exit animation does not display

// ADD FEATURE:
// Add a button to copy the URL to the clipboard

// ADD FEATURE:
// Add a button to share the URL on social media

// ADD FEATURE:
// Make the function delete itself after a long time in database
