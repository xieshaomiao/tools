const { toolList } = require('../../utils/tools');

Page({
  data: {
    keyword: '',
    categories: ['全部', ...Array.from(new Set(toolList.map((tool) => tool.category)))],
    activeCategory: '全部',
    tools: toolList
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value });
    this.filterTools(event.detail.value, this.data.activeCategory);
  },

  chooseCategory(event) {
    const category = event.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    this.filterTools(this.data.keyword, category);
  },

  filterTools(keyword, category) {
    const query = (keyword || '').trim().toLowerCase();
    const tools = toolList.filter((tool) => {
      const matchesCategory = category === '全部' || tool.category === category;
      const matchesKeyword = !query || `${tool.title}${tool.description}${tool.badge}`.toLowerCase().includes(query);
      return matchesCategory && matchesKeyword;
    });
    this.setData({ tools });
  },

  openTool(event) {
    const key = event.currentTarget.dataset.key;
    wx.navigateTo({ url: `/pages/tool/tool?key=${key}` });
  },

  openAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  onShareAppMessage() {
    return {
      title: 'Toolly 工具箱 · 离线实用工具',
      path: '/pages/index/index'
    };
  }
});
