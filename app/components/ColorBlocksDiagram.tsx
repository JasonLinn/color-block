'use client';

import React, { useState } from 'react';

interface Block {
  id: string;
  type: 'rect' | 'circle';
  name: string;
  color: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  cx?: number;
  cy?: number;
  r?: number;
  textX?: number;
  textY?: number;
  textColor?: string;
  text?: string;
  stroke?: string;
  strokeWidth?: number;
  pointerEvents?: string;
}

// ... existing code ... 