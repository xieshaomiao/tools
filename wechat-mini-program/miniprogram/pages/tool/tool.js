const { findTool, executeTool } = require('../../utils/tools');

Page({
  data: {
    tool: {},
    input: '',
    secondInput: '',
    optionIndex: 0,
    output: '',
    passwordLength: 16,
    useSymbols: true
  },

  onLoad(options) {
    const tool = findTool(options.key);
    if (!tool) {
      wx.showToast({ title: '工具不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 500);
      return;
    }
    this.setData({ tool });
    wx.setNavigationBarTitle({ title: tool.title });
  },

  setInput(event) {
    this.setData({ input: event.detail.value });
  },

  setSecondInput(event) {
    this.setData({ secondInput: event.detail.value });
  },

  setOption(event) {
    this.setData({ optionIndex: Number(event.detail.value) });
  },

  setPasswordLength(event) {
    this.setData({ passwordLength: event.detail.value });
  },

  setUseSymbols(event) {
    this.setData({ useSymbols: event.detail.value });
  },

  run() {
    const tool = this.data.tool;
    const selectedOption = tool.options ? tool.options[this.data.optionIndex].value : this.data.secondInput;
    const output = executeTool(tool.key, this.data.input, selectedOption, {
      length: this.data.passwordLength,
      useSymbols: this.data.useSymbols
    });
    this.setData({ output });
  },

  copyOutput() {
    if (!this.data.output) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    wx.setClipboardData({ data: this.data.output });
  },

  exportOutput() {
    if (!this.data.output) {
      wx.showToast({ title: '暂无结果', icon: 'none' });
      return;
    }
    const fileName = `toolly-${this.data.tool.key}-${Date.now()}.txt`;
    const filePath = `${wx.env.USER_DATA_PATH}/${fileName}`;
    wx.getFileSystemManager().writeFile({
      filePath,
      data: this.data.output,
      encoding: 'utf8',
      success: () => {
        if (wx.shareFileMessage) {
          wx.shareFileMessage({
            filePath,
            fileName,
            fail: () => wx.showToast({ title: '导出已取消', icon: 'none' })
          });
          return;
        }
        wx.saveFile({
          tempFilePath: filePath,
          success: () => wx.showToast({ title: '文件已保存', icon: 'success' }),
          fail: () => wx.showToast({ title: '保存失败', icon: 'none' })
        });
      },
      fail: () => wx.showToast({ title: '导出失败', icon: 'none' })
    });
  },

  clearAll() {
    this.setData({ input: '', secondInput: '', output: '' });
  },

  onShareAppMessage() {
    return {
      title: `${this.data.tool.title} · Toolly 工具箱`,
      path: `/pages/tool/tool?key=${this.data.tool.key}`
    };
  }
});
