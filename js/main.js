// 加载学习材料
async function loadMaterials() {
    try {
        const response = await fetch('materials.json');
        const materials = await response.json();
        displayMaterials(materials);
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
            </div>
        </div>
    `).join('');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadMaterials();
}); 