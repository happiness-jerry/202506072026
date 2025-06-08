// Markdown解析器
function parseMarkdown(markdown) {
    // 替换规则
    const rules = [
        { regex: /^## (.*$)/gim, replace: '<h3>$1</h3>' },
        { regex: /^### (.*$)/gim, replace: '<h4>$1</h4>' },
        { regex: /\*\*(.*?)\*\*/g, replace: '<strong>$1</strong>' },
        { regex: /\*(.*?)\*/g, replace: '<em>$1</em>' },
        { regex: /`(.*?)`/g, replace: '<code>$1</code>' },
        { regex: /^> (.*$)/gim, replace: '<blockquote>$1</blockquote>' },
        { regex: /\[(.*?)\]\((.*?)\)/g, replace: '<a href="$2">$1</a>' },
        { regex: /\n\n/g, replace: '</p><p>' },  // 双换行转换为段落
        { regex: /\n/g, replace: '<br>' }        // 单换行转换为换行符
    ];

    // 添加段落包裹
    let html = `<p>${markdown}</p>`;
    
    // 应用所有替换规则
    rules.forEach(rule => {
        if (typeof rule.replace === 'function') {
            html = html.replace(rule.regex, rule.replace);
        } else {
            html = html.replace(rule.regex, rule.replace);
        }
    });
    
    return html;
}