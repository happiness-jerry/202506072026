// Markdown解析器
function parseMarkdown(markdown) {
    // 处理标题
    markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    markdown = markdown.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
    markdown = markdown.replace(/^###### (.*$)/gm, '<h6>$1</h6>');

    // 处理加粗和斜体
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 处理列表
    markdown = markdown.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^\s*-\s(.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^\s*\d+\.\s(.*$)/gm, '<li>$1</li>');

    // 处理代码块
    markdown = markdown.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 处理引用
    markdown = markdown.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>');

    // 处理链接
    markdown = markdown.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // 处理图片
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');

    // 处理水平线
    markdown = markdown.replace(/^---$/gm, '<hr>');

    // 处理段落
    markdown = markdown.replace(/\n\n/g, '</p><p>');
    markdown = '<p>' + markdown + '</p>';

    // 处理换行
    markdown = markdown.replace(/\n/g, '<br>');

    // 清理多余的段落标签
    markdown = markdown.replace(/<p><\/p>/g, '');
    markdown = markdown.replace(/<p><br><\/p>/g, '');

    return markdown;
} 