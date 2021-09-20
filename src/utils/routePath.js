export default function getRoutePath(path = '') {
    let pagePath = path;
  
    if (typeof pagePath !== 'string') {
      pagePath = '';
    }
  
    pagePath = pagePath.trim();
  
    if (!pagePath.startsWith('/')) {
      pagePath = `/${pagePath}`;
    }
  
    return pagePath;
  }
  