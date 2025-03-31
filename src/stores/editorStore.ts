import EditorJS from '@editorjs/editorjs';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  editor: EditorJS | null;
  editorData: any;
};

type Actions = {
  setEditor: (editor: EditorJS | null) => void;
  setEditorData: (editorData: any) => void;
};

export const useEditorStore = create<State & Actions>()(
  immer((set) => ({
    editor: null,
    editorData: null,
    setEditor: (editor: EditorJS | null) => set({ editor }),
    setEditorData: (editorData: any) => set({ editorData }),
  }))
);
