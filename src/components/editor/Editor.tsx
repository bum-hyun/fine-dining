import Delimiter from '@editorjs/delimiter';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import { useEffect } from 'react';

import SupabaseImageTool from '@/utils/editor/SupabaseImageTool';
import TextColor from '@/utils/editor/TextColor';

interface IEditorProps {}

const Editor = ({}: IEditorProps) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',

      tools: {
        heading: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: SupabaseImageTool,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: '인용구 입력',
            captionPlaceholder: '출처',
          },
        },
        embed: Embed,
        marker: Marker,
        delimiter: Delimiter,
        color: {
          class: TextColor,
          config: {
            colorCollections: ['#ffffff', '#000000', '#16b06d', '#00c6be', '#2e84b6', '#959595', '#f4c016', '#f6655b', '#ec4c69', '#5c5cb2'],
          },
        },
        // backgroundColor: {
        //   class: TextBackgroundColor,
        //   config: {
        //     colorCollections: ['#ffffff', '#000000', '#16b06d', '#00c6be', '#2e84b6', '#959595', '#f4c016', '#f6655b', '#ec4c69', '#5c5cb2'],
        //   },
        // },
      },

      onReady: () => {
        console.log('Editor.js ready!');
      },
    });

    return () => {
      editor.isReady.then(() => editor.destroy()).catch((err) => console.error('Editor.js cleanup failed:', err));
    };
  }, []);

  return <div id={'editorjs'}></div>;
};

export default Editor;
