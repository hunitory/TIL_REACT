import React from "react";

interface DragProps {
  e: React.DragEvent;
  index: number;
}

export default function handleDragEvents({ e, index }: DragProps) {
  console.log(e, index);
  return;
}
