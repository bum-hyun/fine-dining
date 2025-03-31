import { API, BlockAPI } from '@editorjs/editorjs';

import browserClient from '@/utils/supabase/client';

export default class SupabaseImageTool {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '🖼️',
    };
  }

  private readonly data: { url?: string };
  private readonly api: API;
  private readonly wrapper: HTMLElement;
  private readonly block: BlockAPI;
  private isInitialRender = true;

  constructor({ data, api, block }: any) {
    this.data = data || {};
    this.api = api;
    this.block = block;
    this.wrapper = document.createElement('div');
  }

  render() {
    this.wrapper.innerHTML = '';
    this.wrapper.tabIndex = 0;

    // 이미지가 있으면 보여주기
    if (this.data.url) {
      const img = document.createElement('img');
      img.src = this.data.url;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      this.wrapper.appendChild(img);
    } else {
      // 👉 이미지 없으면 input 트리거
      if (this.isInitialRender) {
        this.isInitialRender = false;

        setTimeout(() => this.triggerFileSelect(), 50);
      }

      this.wrapper.innerHTML = '<div style="color:#999">이미지 업로드 중입니다...</div>';
    }

    this.wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        const index = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.delete(index);
      }
    });

    // 선택 시 포커스 주기
    this.wrapper.addEventListener('click', () => {
      this.wrapper.focus();
    });

    this.wrapper.addEventListener('focus', () => {
      this.wrapper.style.opacity = '0.8';
    });

    this.wrapper.addEventListener('blur', () => {
      this.wrapper.style.opacity = '1';
    });

    return this.wrapper;
  }

  handleKeydown = (e: KeyboardEvent) => {
    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    const isFocused = this.api.blocks.getBlockByIndex(currentIndex)?.id === this.block.id;

    if (isFocused && e.key === 'Backspace') {
      if (this.data.url) {
        this.api.blocks.delete(currentIndex);
      }
    }
  };

  async triggerFileSelect() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;

      const filePath = `files/${Date.now()}_${file.name}`;
      const { error } = await browserClient.storage.from('files').upload(filePath, file);
      if (error) {
        console.error('Upload error:', error);
        return;
      }

      const { publicUrl } = browserClient.storage.from('files').getPublicUrl(filePath).data;

      // 이미지 저장 & 다시 렌더
      this.data.url = publicUrl;
      this.wrapper.innerHTML = '';
      const img = document.createElement('img');
      img.src = publicUrl;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      this.wrapper.appendChild(img);
    });

    input.click();
  }

  save() {
    return this.data;
  }
}
