import React, { useState } from 'react';

const ColorBlocksDiagram = () => {
  // 初始色塊定義
  const initialBlocks = [
    {
      id: 'background',
      type: 'rect',
      name: '背景區域',
      color: '#141414',
      x: 0, y: 0, width: 800, height: 200,
      textX: 400, textY: 100,
      textColor: 'white'
    },
    {
      id: 'ground',
      type: 'rect',
      name: '地面',
      color: '#555555',
      x: 0, y: 480, width: 800, height: 120,
      textX: 400, textY: 530,
      textColor: 'white'
    },
    {
      id: 'car',
      type: 'rect',
      name: '汽車',
      color: '#A9A9A9',
      x: 80, y: 380, width: 180, height: 100, rx: 10,
      textX: 170, textY: 430,
      textColor: 'white'
    },
    {
      id: 'tablecloth',
      type: 'rect',
      name: '攤位桌布',
      color: '#D30F4A',
      x: 150, y: 350, width: 500, height: 150,
      textX: 400, textY: 425,
      textColor: 'white'
    },
    {
      id: 'banner',
      type: 'rect',
      name: '招牌主體',
      color: '#D50F38',
      x: 150, y: 180, width: 350, height: 80,
      textX: 325, textY: 220,
      textColor: 'white'
    },
    {
      id: 'bannerOrange',
      type: 'rect',
      name: '招牌橙色部分',
      color: '#FF4500',
      x: 150, y: 180, width: 100, height: 80,
      textX: 200, textY: 220,
      textColor: 'white',
      text: ''
    },
    {
      id: 'displayCase',
      type: 'rect',
      name: '展示櫃',
      color: 'rgba(200, 200, 200, 0.3)',
      x: 170, y: 280, width: 460, height: 70,
      textX: 400, textY: 275,
      textColor: 'white',
      pointerEvents: 'none'
    },
    {
      id: 'foodYellow',
      type: 'rect',
      name: '食物-黃色',
      color: '#FFBF00',
      x: 190, y: 295, width: 120, height: 40,
      textX: 250, textY: 315,
      textColor: 'black',
      text: ''
    },
    {
      id: 'foodGreen',
      type: 'rect',
      name: '食物-綠色',
      color: '#228B22',
      x: 320, y: 295, width: 120, height: 40,
      textX: 380, textY: 315,
      textColor: 'white',
      text: ''
    },
    {
      id: 'foodWhite',
      type: 'rect',
      name: '食物-白色',
      color: '#F5F5F5',
      x: 450, y: 295, width: 120, height: 40,
      textX: 510, textY: 315,
      textColor: 'black',
      text: ''
    },
    {
      id: 'staff',
      type: 'rect',
      name: '工作人員',
      color: '#D50F38',
      x: 600, y: 220, width: 60, height: 160,
      textX: 630, textY: 300,
      textColor: 'white'
    },
    {
      id: 'staffHead',
      type: 'circle',
      name: '工作人員-頭部',
      color: '#F5F5F5',
      cx: 630, cy: 250, r: 25,
      pointerEvents: 'none',
      text: ''
    },
    {
      id: 'logoLeft',
      type: 'circle',
      name: '標誌-左',
      color: 'none',
      cx: 220, cy: 400, r: 30,
      stroke: 'gold',
      strokeWidth: 2,
      pointerEvents: 'none',
      text: ''
    },
    {
      id: 'logoRight',
      type: 'circle',
      name: '標誌-右',
      color: 'none',
      cx: 580, cy: 400, r: 30,
      stroke: 'gold',
      strokeWidth: 2,
      pointerEvents: 'none',
      text: ''
    }
  ];

  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [currentColor, setCurrentColor] = useState('#D30F4A');
  const [editMode, setEditMode] = useState(false);
  const [newBlock, setNewBlock] = useState({
    type: 'rect',
    name: '',
    color: '#FF0000',
    x: 300, y: 300, width: 100, height: 80,
    textX: 350, textY: 340,
    textColor: 'white'
  });

  // 處理顏色變更
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    
    if (selectedBlock) {
      const updatedBlocks = blocks.map(block => 
        block.id === selectedBlock ? {...block, color: newColor} : block
      );
      setBlocks(updatedBlocks);
    }
  };

  // 處理區塊選擇
  const handleBlockSelect = (blockId) => {
    if (editMode) return;
    
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setSelectedBlock(blockId);
      setCurrentColor(block.color);
    }
  };

  // 重置所有色塊
  const resetBlocks = () => {
    setBlocks(initialBlocks);
    setSelectedBlock(null);
    setEditMode(false);
  };

  // 刪除選中的色塊
  const deleteSelectedBlock = () => {
    if (!selectedBlock) return;
    
    // 避免刪除基本元素
    const protectedIds = ['background', 'ground', 'tablecloth'];
    if (protectedIds.includes(selectedBlock)) {
      alert('無法刪除基本結構元素！');
      return;
    }
    
    const updatedBlocks = blocks.filter(block => block.id !== selectedBlock);
    setBlocks(updatedBlocks);
    setSelectedBlock(null);
  };

  // 添加新色塊
  const addNewBlock = () => {
    // 生成唯一ID
    const timestamp = new Date().getTime();
    const newBlockWithId = {
      ...newBlock,
      id: `block_${timestamp}`
    };
    
    setBlocks([...blocks, newBlockWithId]);
    setNewBlock({
      ...newBlock,
      name: '',
      x: Math.max(50, Math.min(600, newBlock.x + 20)),
      y: Math.max(50, Math.min(500, newBlock.y + 20))
    });
  };

  // 更新新色塊屬性
  const handleNewBlockChange = (field, value) => {
    setNewBlock({
      ...newBlock,
      [field]: value
    });
  };

  // 渲染單個區塊
  const renderBlock = (block) => {
    const commonProps = {
      fill: block.color,
      stroke: selectedBlock === block.id ? "yellow" : "white",
      strokeWidth: selectedBlock === block.id ? 3 : 1,
      onClick: () => handleBlockSelect(block.id),
      className: block.pointerEvents === 'none' ? 'pointer-events-none' : 'cursor-pointer'
    };

    if (block.type === 'rect') {
      return (
        <rect
          key={block.id}
          x={block.x}
          y={block.y}
          width={block.width}
          height={block.height}
          rx={block.rx || 0}
          {...commonProps}
        />
      );
    } else if (block.type === 'circle') {
      return (
        <circle
          key={block.id}
          cx={block.cx}
          cy={block.cy}
          r={block.r}
          {...commonProps}
          stroke={block.stroke || (selectedBlock === block.id ? "yellow" : "white")}
          strokeWidth={block.strokeWidth || (selectedBlock === block.id ? 3 : 1)}
        />
      );
    }
    return null;
  };

  // 渲染區塊標籤文字
  const renderBlockText = (block) => {
    if (block.text === '') return null;
    
    const text = block.text !== undefined ? block.text : block.name;
    
    if (block.type === 'rect') {
      return (
        <text
          key={`text_${block.id}`}
          x={block.textX}
          y={block.textY}
          textAnchor="middle"
          fontSize={block.fontSize || "14"}
          fill={block.textColor || 'white'}
          className="pointer-events-none"
        >
          {text}
        </text>
      );
    } else if (block.type === 'circle') {
      return (
        <text
          key={`text_${block.id}`}
          x={block.cx}
          y={block.cy}
          textAnchor="middle"
          fontSize={block.fontSize || "14"}
          fill={block.textColor || 'white'}
          className="pointer-events-none"
        >
          {text}
        </text>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mb-4">炭少年攤位互動色塊示意圖 - 進階編輯器</h2>
      
      {/* 控制面板 */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg w-full max-w-lg">
        <div className="flex flex-col gap-4">
          {/* 模式切換按鈕 */}
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => setEditMode(false)}
              className={`px-4 py-2 rounded ${!editMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              顏色編輯模式
            </button>
            <button 
              onClick={() => setEditMode(true)}
              className={`px-4 py-2 rounded ${editMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              區塊編輯模式
            </button>
          </div>
          
          {!editMode ? (
            // 顏色編輯模式
            <>
              <div className="flex items-center justify-between">
                <span className="font-medium">選擇區塊: </span>
                <span className="font-medium">
                  {selectedBlock ? `目前選擇: ${blocks.find(b => b.id === selectedBlock)?.name || selectedBlock}` : '尚未選擇區塊'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={currentColor} 
                  onChange={handleColorChange}
                  className="w-12 h-10" 
                  disabled={!selectedBlock}
                />
                <input 
                  type="text" 
                  value={currentColor} 
                  onChange={(e) => handleColorChange({target: {value: e.target.value}})}
                  className="border px-2 py-1 w-24" 
                  disabled={!selectedBlock}
                />
                <button 
                  onClick={deleteSelectedBlock}
                  className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                  disabled={!selectedBlock}
                >
                  刪除區塊
                </button>
              </div>
            </>
          ) : (
            // 區塊編輯模式
            <div className="flex flex-col gap-3 border p-3 rounded">
              <h3 className="font-bold">添加新區塊</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm">形狀</label>
                  <select 
                    value={newBlock.type} 
                    onChange={(e) => handleNewBlockChange('type', e.target.value)}
                    className="w-full border px-2 py-1"
                  >
                    <option value="rect">矩形</option>
                    <option value="circle">圓形</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm">名稱</label>
                  <input 
                    type="text" 
                    value={newBlock.name} 
                    onChange={(e) => handleNewBlockChange('name', e.target.value)}
                    className="w-full border px-2 py-1"
                    placeholder="區塊名稱"
                  />
                </div>
                
                <div>
                  <label className="block text-sm">顏色</label>
                  <div className="flex gap-1">
                    <input 
                      type="color" 
                      value={newBlock.color} 
                      onChange={(e) => handleNewBlockChange('color', e.target.value)}
                      className="w-10 h-8"
                    />
                    <input 
                      type="text" 
                      value={newBlock.color} 
                      onChange={(e) => handleNewBlockChange('color', e.target.value)}
                      className="flex-1 border px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm">文字顏色</label>
                  <input 
                    type="color" 
                    value={newBlock.textColor} 
                    onChange={(e) => handleNewBlockChange('textColor', e.target.value)}
                    className="w-full h-8"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {newBlock.type === 'rect' ? (
                  <>
                    <div>
                      <label className="block text-sm">X</label>
                      <input 
                        type="number" 
                        value={newBlock.x} 
                        onChange={(e) => handleNewBlockChange('x', parseInt(e.target.value) || 0)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Y</label>
                      <input 
                        type="number" 
                        value={newBlock.y} 
                        onChange={(e) => handleNewBlockChange('y', parseInt(e.target.value) || 0)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">寬</label>
                      <input 
                        type="number" 
                        value={newBlock.width} 
                        onChange={(e) => handleNewBlockChange('width', parseInt(e.target.value) || 10)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">高</label>
                      <input 
                        type="number" 
                        value={newBlock.height} 
                        onChange={(e) => handleNewBlockChange('height', parseInt(e.target.value) || 10)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm">中心X</label>
                      <input 
                        type="number" 
                        value={newBlock.cx || 400} 
                        onChange={(e) => handleNewBlockChange('cx', parseInt(e.target.value) || 0)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">中心Y</label>
                      <input 
                        type="number" 
                        value={newBlock.cy || 300} 
                        onChange={(e) => handleNewBlockChange('cy', parseInt(e.target.value) || 0)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">半徑</label>
                      <input 
                        type="number" 
                        value={newBlock.r || 30} 
                        onChange={(e) => handleNewBlockChange('r', parseInt(e.target.value) || 5)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">線寬</label>
                      <input 
                        type="number" 
                        value={newBlock.strokeWidth || 1} 
                        onChange={(e) => handleNewBlockChange('strokeWidth', parseInt(e.target.value) || 1)}
                        className="w-full border px-2 py-1"
                      />
                    </div>
                  </>
                )}
              </div>
              
              <button 
                onClick={addNewBlock}
                className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={!newBlock.name}
              >
                添加新區塊
              </button>
            </div>
          )}
          
          <button 
            onClick={resetBlocks}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            重置所有區塊
          </button>
        </div>
      </div>

      {/* SVG 圖形 */}
      <div className="w-full overflow-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full max-w-3xl mx-auto border bg-gray-50">
          {/* 渲染所有區塊 */}
          {blocks.map(block => renderBlock(block))}
          
          {/* 渲染所有文字 */}
          {blocks.map(block => renderBlockText(block))}
          
          {/* 繪製編輯模式下的新區塊預覽 */}
          {editMode && newBlock.name && (
            newBlock.type === 'rect' ? (
              <rect
                x={newBlock.x}
                y={newBlock.y}
                width={newBlock.width}
                height={newBlock.height}
                rx={newBlock.rx || 0}
                fill={newBlock.color}
                stroke="yellow"
                strokeWidth={2}
                strokeDasharray="4 2"
                opacity={0.7}
              />
            ) : (
              <circle
                cx={newBlock.cx || 400}
                cy={newBlock.cy || 300}
                r={newBlock.r || 30}
                fill={newBlock.color}
                stroke="yellow"
                strokeWidth={2}
                strokeDasharray="4 2"
                opacity={0.7}
              />
            )
          )}
        </svg>
      </div>

      {/* 說明 */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full max-w-2xl">
        <h3 className="text-lg font-bold mb-2">使用說明</h3>
        <h4 className="font-medium mt-2">顏色編輯模式：</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>點擊圖中的色塊區域進行選擇</li>
          <li>使用顏色選擇器或輸入十六進位色碼來更改顏色</li>
          <li>選擇區塊後可點擊「刪除區塊」按鈕來移除它（基本結構無法刪除）</li>
        </ol>
        
        <h4 className="font-medium mt-2">區塊編輯模式：</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>填寫新區塊的屬性（名稱、顏色、位置、大小等）</li>
          <li>新區塊會以虛線黃色邊框顯示預覽</li>
          <li>點擊「添加新區塊」按鈕確認添加</li>
        </ol>
        
        <div className="mt-2">
          <p>點擊「重置所有區塊」可恢復原始配置</p>
        </div>
      </div>
    </div>
  );
};

export default ColorBlocksDiagram;
