import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import myData from './abc.json';
const TextEditor2 = (props:any) => {


  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  // const saveDesign = () => {
  //   const unlayer = emailEditorRef.current?.editor;

  //   unlayer?.saveDesign((design:any) => {
  //     console.log('saveDesign', design);
  //     alert('Design JSON has been logged in your developer console.');
  //   });
  // };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = {  : };
    // unlayer.loadDesign(templateJson);
  };


  return (
    <div>
      {/* <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
      <button onClick={saveDesign}>Save Design</button> */}

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default TextEditor2;