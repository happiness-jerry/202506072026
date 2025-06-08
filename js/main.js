// 全局变量
let allMaterials = [];
const materialDetailModal = document.getElementById('material-detail-modal');
const materialDetailContent = document.getElementById('material-detail-content');
const detailModalTitle = document.getElementById('detail-modal-title');

// 加载学习材料
async function loadMaterials() {
    try {
        const response = await fetch('materials.json');
        allMaterials = await response.json();
        displayMaterials(allMaterials);
        
        // 检查URL参数是否请求了详情
        const urlParams = new URLSearchParams(window.location.search);
        const materialId = urlParams.get('material');
        if (materialId) {
            showMaterialDetail(parseInt(materialId));
        }
    } catch (error) {
        console.error('加载材料失败:', error);
    }
}

// 显示学习材料
function displayMaterials(materials) {
    const materialGrid = document.querySelector('.material-grid');
    if (!materialGrid) return;

    materialGrid.innerHTML = materials.map(material => `
        <div class="material-card">
            <div class="material-header">
                <h3 class="material-title">${material.title}</h3>
                <div class="material-id">ID: ${material.id}</div>
            </div>
            <div class="material-body">
                <p class="material-description">${material.description}</p>
                <div class="material-stats">
                    <span>时长: ${material.duration}</span>
                    <span>难度: ${material.level}</span>
                </div>
                <div class="material-actions">
                    <button class="btn btn-icon btn-view" data-id="${material.id}">
                        <i class="fas fa-eye"></i> 查看详情
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // 添加查看详情事件监听
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showMaterialDetail(id);
        });
    });
}

// 显示材料详情
async function showMaterialDetail(id) {
    const material = allMaterials.find(m => m.id === id);
    if (!material) return;
    
    try {
        // 加载Markdown内容
        const response = await fetch(`posts/${material.filename}`);
        if (!response.ok) throw new Error('材料内容加载失败');
        const markdownContent = await response.text();
        
        // 解析Markdown
        const contentHtml = parseMarkdown(markdownContent);
        
        // 更新URL添加参数
        window.history.pushState({}, '', `?material=${id}`);
        
        detailModalTitle.textContent = material.title;
        materialDetailContent.innerHTML = `
            <div class="material-detail">
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> 材料概览</h3>
                    <div class="detail-section-content">
                        <p><strong>主题：</strong> ${material.title}</p>
                        <p><strong>训练时长：</strong> ${material.duration || '60分钟'}</p>
                        <p><strong>难度等级：</strong> ${material.level || '中级'}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-book"></i> 训练内容</h3>
                    <div class="detail-section-content markdown-content">
                        ${contentHtml}
                    </div>
                </div>
            </div>
        `;
        
        materialDetailModal.style.display = 'flex';
    } catch (error) {
        console.error('加载材料详情出错:', error);
        materialDetailContent.innerHTML = `<div class="error">材料内容加载失败</div>`;
    }
}

// 关闭模态框
function closeModal(modal) {
    modal.style.display = 'none';
    // 从URL移除material参数
    const url = new URL(window.location);
    url.searchParams.delete('material');
    window.history.replaceState({}, '', url);
}

// 事件监听器
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// 点击模态框外部关闭
window.addEventListener('click', function(e) {
    if (e.target === materialDetailModal) {
        closeModal(materialDetailModal);
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', loadMaterials); 