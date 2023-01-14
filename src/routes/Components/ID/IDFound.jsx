import CodeEditor from '@uiw/react-textarea-code-editor';

export default function IDFound({ title, createdAt, functy, language }) {
  const code = functy;

  return (
    <div>
      <h1 className='app-title'>
        <a href='https://functy.me'>functy.me</a>
      </h1>
      <div className='functy-form'>
        <input
          className='functy-input'
          type='text'
          placeholder={'untitled ' + language + ' file'}
          value={title}
        />
        <CodeInput code={code} lang={language} />
        <h3>
          Created At:{' '}
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(createdAt)}
        </h3>
      </div>
    </div>
  );
}

function CodeInput({ code, lang }) {
  return (
    <div className='functy-input-code-id'>
      <CodeEditor
        value={code}
        language={lang}
        className='functy-code-editor'
        placeholder='Functy.me'
        padding={15}
        style={{
          fontSize: 24,
          backgroundColor: '#101010',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  );
}
